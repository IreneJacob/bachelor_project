package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.annotation.GuardMethod;
import ch.usi.dag.disl.guardcontext.GuardContext;
import ch.usi.dag.disl.guardcontext.ReflectionStaticContext;
import ch.usi.dag.disl.staticcontext.ClassStaticContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.concurrent.ConcurrentHashMap;

final class RunnableGuards {

    private RunnableGuards() { /* Prevent instantiation */ }

    private final static class RunnableGuard {

        private RunnableGuard() { /* Prevent instantiation */ }

        final private static ConcurrentHashMap<Class<?>, Boolean> __cache = new ConcurrentHashMap<>();

        @GuardMethod
        public static boolean isApplicable(final ClassStaticContext csc, final ReflectionStaticContext rsc) {
            return ReflectionUtils.classIsCompatible(csc.getName(), Runnable.class, __cache, "java/lang/Runnable", rsc);
        }
    }

    final static class RunnableConstructorGuard {

        private RunnableConstructorGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("<init>") && gc.invoke(RunnableGuard.class);
        }
    }

    final static class RunMethodGuard {

        private RunMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("run")
                    && msc.thisMethodDescriptor().equals("()V")
                    && gc.invoke(RunnableGuard.class);
        }
    }

    final static class RunnableProcessingGuard {

        private RunnableProcessingGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(RunnableGuard.class)
                    && !gc.invoke(RunnableConstructorGuard.class)
                    && !gc.invoke(RunMethodGuard.class);
        }
    }
}
