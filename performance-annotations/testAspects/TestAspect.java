//import org.aspectj.lang.annotation.After;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//
//@Aspect
//    public class TestAspect {
//
//    /* Read as -- do this *before* any *call* to the function
//     * *java.io.PrintStream.println* that takes a *String*
//     * and returns *void* and the function is not called
//     * within any class under the package net.andrewewhite.aspects
//     */
//    //     @Before("call(void com.google.javascript.jscomp.CommandLineRunner.main(String []))")
//    @Before("call(* *(..)) && !cflow(within(TestAspect))")
//	public void beforePrintlnCall() {
//        System.out.println("IT WORKS!!!");
//    }
//
//}


//---------------------------------------------- Simple Tracer ---------------------------------------------------------
//
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.After;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//
//@Aspect
//    public class TestAspect{
//
////    private static final Logger logger = Logger.getLogger(CommandLineRunner.class.getName());
////
////    pointcut tracedCall(CommandLineRunner c):
////        call(CommandLineRunner.printUsage()) && target(p);
////    @Before("call(* *(..)) && !cflow(within(TestAspect))")
//    @Before("call(* setExterns(..)) && !cflow(within(TestAspect))")
//    public  void logBefore(JoinPoint joinPoint){
//        System.out.println("logBefore() is running!");
//        System.out.println("hijacked: " + joinPoint.getSignature().getClass());
//        System.out.println("******");
//    }
//
//}

//----------------------------------------------------------------------------------------------------------------------