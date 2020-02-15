import BaseGameObject from "../models/objects/base-game-object";
import Visitor from "../rendering/visitor-interface";

class Scene extends BaseGameObject
{
    public sceneObjects: BaseGameObject[];

    accept = function(visitor: Visitor)
    {
        visitor.visit(this);
    }
}

export default Scene;