import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class SimpleTracer{
    @Pointcut("execution(* com.google.javascript.jscomp.CommandLineRunner.main(..)) && !cflow(within(SimpleTracer))")
    void traceMethod(){}

    @Before("traceMethod()")
    public void logTraceDetails(JoinPoint joinPoint){
        System.out.println("We will enter "+joinPoint+ "at " + joinPoint.getSourceLocation());
    }

//    The following is equivalent but uses an inline pointcut
    @After("execution(* com.google.javascript.jscomp.AbstractCommandLineRunner.doRun(..)) && !cflow(within(SimpleTracer))")
    public void logStackTrace(JoinPoint joinPoint){
        System.out.println("" + joinPoint.getSourceLocation().getWithinType().getName() + "::" +joinPoint.getSourceLocation().getFileName() + ":" + joinPoint.getSourceLocation().getLine());
    }
}