import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
@Aspect
public class TimeProfiler{

    private int counter = 0;

    @Pointcut("execution(* com.google.javascript.jscomp.AbstractCommandLineRunner.doRun(..))")
    public void timeMethod(){}

    @Before("timeMethod()")
    public void count(){
        counter++;
    }

    @Around("timeMethod()")
    public Object profile(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
        long start = System.currentTimeMillis();
        System.out.println("Going to call the method.");
        Object output = proceedingJoinPoint.proceed();
        System.out.println("Method execution completed.");
        long elapsedTime = System.currentTimeMillis() - start;
        System.out.println("Method execution time: " + elapsedTime + " milliseconds.");
        System.out.println(proceedingJoinPoint.getSourceLocation().getFileName() + ": " + proceedingJoinPoint.getSourceLocation().getLine());
        System.out.println("Method Called " + counter + " time(s)");
        return output;
    }
}