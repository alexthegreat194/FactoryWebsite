
function craft(mat1, mat2)
{
    if(mat1.name == "" && mat2.name == "")
        return new Material(0);

    if(mat1.name == "Wood" && mat2.name == "Iron")
        return new Material(7);

    return null
}