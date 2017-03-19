import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

class CallData {
    long count;
    long time_ns;
    String feature;

    CallData() {
        count = 0;
    }
}

class Instrumentation {
    java.util.HashMap<String, CallData> calls;

    Instrumentation() {
        calls = new java.util.HashMap<String, CallData>();
    }

    void log_call(String c) {
        CallData d = calls.get(c);
        if (d == null) {
            d = new CallData();
            calls.put(c, d);
        }
        d.count += 1;
        
    }
}

@Aspect
public class MethodCallerProfiler{
    @Pointcut("execution(* com.google.javascript.jscomp.NodeTraversal.*(..)) && !cflow(within(MethodCallerProfiler))")
    void traceMethod(){}

    @Before("traceMethod()")
    public void logTraceDetails(JoinPoint joinPoint){
        System.out.println(joinPoint);
    }
/*
//    The following is equivalent but uses an inline pointcut
    @After("execution(* com.google.javascript.jscomp.AbstractCommandLineRunner.doRun(..)) && !cflow(within(MethodCallerProfiler))")
    public void logStackTrace(JoinPoint joinPoint){
        System.out.println("" + joinPoint.getSourceLocation().getWithinType().getName() + "::" +joinPoint.getSourceLocation().getFileName() + ":" + joinPoint.getSourceLocation().getLine());
    }
*/
}
