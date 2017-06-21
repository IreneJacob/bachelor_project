package ch.usi.dag.tools.taskprof.instrumentationSVM;


import ch.usi.dag.disl.annotation.After;
import ch.usi.dag.disl.annotation.Before;
import ch.usi.dag.disl.annotation.SyntheticLocal;
import ch.usi.dag.disl.annotation.ThreadLocal;
import ch.usi.dag.disl.dynamiccontext.DynamicContext;
import ch.usi.dag.disl.marker.AfterInitBodyMarker;
import ch.usi.dag.disl.marker.BasicBlockMarker;
import ch.usi.dag.disl.marker.BodyMarker;
import ch.usi.dag.disl.staticcontext.BasicBlockStaticContext;
import ch.usi.dag.tools.taskprof.guards.Guards;
import ch.usi.dag.tools.taskprof.profilerSVM.ProfilerRE;
import ch.usi.dag.tools.taskprof.util.Stack;

public class Instrumentation {

    @ThreadLocal
    static int openTaskProcessing = 0;

    @ThreadLocal
    static long bc = 0;

    @ThreadLocal
    static long ss_bcNestedExecution_tl_0 = 0;

    @ThreadLocal
    static long bcNestedCreation = 0;

    @ThreadLocal
    static int ss_init_tl_0 = 0;

    @ThreadLocal
    static int ss_exec_tl_0 = 0;

    @ThreadLocal
    static Stack<Object> taskStack;

    @SyntheticLocal
    static int ss_init_sl;

    @SyntheticLocal
    static int ss_exec_sl;

    @SyntheticLocal
    static long ss_bcNestedExecution_sl;

    @SyntheticLocal
    static long bcEntrance;


    @Before(marker = BasicBlockMarker.class)
    private static void onBasicBlockEntrance(final BasicBlockStaticContext bbsc) {
        bc += bbsc.getSize();
    }

    @Before(marker = BodyMarker.class, guard = Guards.TaskConstructionGuard.class)
    public static void beforeTaskConstruction(DynamicContext dc) {
        bcEntrance = bc;
        ss_init_sl = ss_init_tl_0;
        ss_init_tl_0 = System.identityHashCode(dc.getThis());
    }

    @After(marker = AfterInitBodyMarker.class, guard = Guards.TaskConstructionGuard.class)
    public static void afterTaskConstruction(DynamicContext dc) {
        final long bcCreation = bc - bcEntrance - bcNestedCreation;

        if (ss_init_sl == 0) {
            ProfilerRE.registerTaskCreation(dc.getThis(), bcCreation);
            bcNestedCreation = 0;
        } else if (ss_init_sl != ss_init_tl_0) {
            ProfilerRE.registerTaskCreation(dc.getThis(), bcCreation);
            bcNestedCreation += bcCreation;
        }

        ss_init_tl_0 = ss_init_sl;
    }

    @Before(marker = BodyMarker.class, guard = Guards.TaskExecutionGuard.class)
    public static void beforeTaskExecution(DynamicContext dc) {
        if (taskStack == null) {
            taskStack = new Stack<>();
        }
        taskStack.push(dc.getThis());
        bcEntrance = bc;
        ss_exec_sl = ss_exec_tl_0;
        ss_exec_tl_0 = System.identityHashCode(dc.getThis());
        ss_bcNestedExecution_sl = ss_bcNestedExecution_tl_0;
    }

    @After(marker = BodyMarker.class, guard = Guards.TaskExecutionGuard.class)
    public static void afterTaskExecution(DynamicContext dc) {
        final long bcTotal = bc - bcEntrance - ss_bcNestedExecution_tl_0 + ss_bcNestedExecution_sl;

        if (ss_exec_sl == 0) {
            // Not nested
            ProfilerRE.registerTaskExecution(dc.getThis(), bcTotal);
            ss_bcNestedExecution_tl_0 = 0;
        } else {
            // Nested
            ProfilerRE.registerTaskExecution(dc.getThis(), bcTotal);
            ss_bcNestedExecution_tl_0 += bcTotal;
        }

        ss_exec_tl_0 = ss_exec_sl;
        taskStack.pop();
    }

    @Before(marker = BodyMarker.class, guard = Guards.TaskProcessingGuard.class)
    public static void beforeTaskProcessing(DynamicContext dc) {
        if (taskStack == null) {
            taskStack = new Stack<>();
        }
        if (!taskStack.contains(dc.getThis())) {
            if (openTaskProcessing == 0) {
                bcEntrance = bc;
            }
            ++openTaskProcessing;
        }
    }

    @After(marker = BodyMarker.class, guard = Guards.TaskProcessingGuard.class)
    public static void afterTaskProcessing(DynamicContext dc) {
        if (!taskStack.contains(dc.getThis())) {
            --openTaskProcessing;
            if (openTaskProcessing == 0) {
                ProfilerRE.registerTaskProcessing(dc.getThis(), bc - bcEntrance);
            }
        }
    }

    @Before(marker = BodyMarker.class, guard = Guards.ThreadStartGuard.class)
    public static void onThreadStart(DynamicContext dc) {
        ProfilerRE.registerThreadStart((Thread) dc.getThis());
    }
}
