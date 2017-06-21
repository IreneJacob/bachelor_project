package ch.usi.dag.tools.taskprof.guards;

import ch.usi.dag.disl.Reflection;
import ch.usi.dag.disl.guardcontext.ReflectionStaticContext;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

final class ReflectionUtils {

    private ReflectionUtils() { /* Prevent instantiation */ }

    static boolean classIsCompatible(final String name, final Class<?> target, final ConcurrentHashMap<Class<?>, Boolean> cache,
                                            final String internalName, final ReflectionStaticContext rsc) {

        // Cannot load lambda from classloader, use DiSL reflection API
        if(name.contains("Lambda"))
            return __handleLambda(rsc, internalName);

        // For regular classes just use the standard reflection API
        return classIsCompatible(name, target, cache);
    }

    static boolean classIsCompatible(final String name, final Class<?> target, final ConcurrentHashMap<Class<?>, Boolean> cache) {
        final Class<?> c;
        try {
            c = Class.forName(name);
        } catch(ClassNotFoundException e) {
            return false;
        }
        return cache.computeIfAbsent(c, target::isAssignableFrom);
    }

    private static boolean __handleLambda(final ReflectionStaticContext rsc, final String internalName) {
        return rsc.thisClass().interfaces().anyMatch(c -> __isLambdaCompatible(c, internalName));
    }

    private static boolean __isLambdaCompatible(final Reflection.Class c, final String internalName) {
        final Optional<Reflection.Class> opt = Reflection.systemClassLoader().classForInternalName(internalName);
        if(!opt.isPresent())
            return false;
        final Reflection.Class target = opt.get();

        final Optional<Reflection.Class> superOpt = c.superClass();

        return c.equals(target) || superOpt.isPresent() && __isLambdaCompatible(superOpt.get(), internalName);
    }

}
