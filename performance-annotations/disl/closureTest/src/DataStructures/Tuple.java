package DataStructures;

/**
 * Created by irenesjacob on 30.03.17.
 */
public class Tuple <X, Y> {
    public final X x;
    public final Y y;

    public Tuple(X feature, Y value){
        this.x = feature;
        this.y = value;
    }
//    public X getFirst(){
//        return this.x;
//    }
//    public Y getSecond(){
//        return this.y;
//    }
}
