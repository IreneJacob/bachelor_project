package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.annotation.GuardMethod;
import ch.usi.dag.disl.guardcontext.GuardContext;
import ch.usi.dag.disl.guardcontext.ReflectionStaticContext;
import ch.usi.dag.disl.staticcontext.ClassStaticContext;
import ch.usi.dag.disl.staticcontext.MethodStaticContext;

import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;

final class CallableGuards {

    private CallableGuards() { /* Prevent instantiation */ }

    private final static class CallableGuard {

        private CallableGuard() { /* Prevent instantiation */ }

        final private static ConcurrentHashMap<Class<?>, Boolean> __cache = new ConcurrentHashMap<>();

        @GuardMethod
        public static boolean isApplicable(final ClassStaticContext csc, final ReflectionStaticContext rsc) {
            return ReflectionUtils.classIsCompatible(csc.getName(), Callable.class, __cache, "java/util/concurrent/Callable", rsc);
        }
    }

    final static class CallableConstructorGuard {

        private CallableConstructorGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("<init>") && gc.invoke(CallableGuards.CallableGuard.class);
        }
    }

    final static class CallMethodGuard {

        private CallMethodGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final MethodStaticContext msc, final GuardContext gc) {
            return msc.thisMethodName().equals("call")
                    && msc.thisMethodDescriptor().equals("()Ljava/lang/Object;")
                    && gc.invoke(CallableGuards.CallableGuard.class);
        }
    }

    final static class CallableProcessingGuard {

        private CallableProcessingGuard() { /* Prevent instantiation */ }

        @GuardMethod
        public static boolean isApplicable(final GuardContext gc) {
            return gc.invoke(CallableGuard.class)
                    && !gc.invoke(CallableConstructorGuard.class)
                    && !gc.invoke(CallMethodGuard.class);
        }
    }
}
