module.exports=(sequelize,Datatype)=>{
    const Students=sequelize.define("students",{
        name:{type:Datatypes.STRING, allowNull:false},
        email:Datatypes.STRING,
        age:Datatype.NUMBER,
        
    })
}