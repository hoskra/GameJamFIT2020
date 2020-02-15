import Visitor from "../../rendering/visitor-interface";

abstract class BaseGameObject
{
    accept: (visitor: Visitor) => void;
}

export default BaseGameObject;