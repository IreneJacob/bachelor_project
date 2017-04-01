package DataStructures;

/**
 * Created by irenesjacob on 30.03.17.
 */
public class KeyValuePair<X, Y> {
    private final X key;
    private final Y value;

    public KeyValuePair(X key, Y value){
        this.key = key;
        this.value = value;
    }
    public X getKey() {
        return key;
    }

    public Y getValue() {
        return value;
    }
}
