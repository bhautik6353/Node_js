const Schema=require("../model/firstSchema")
const passport=require("passport");
const localstrategy = require("passport-local").Strategy;

passport.use("local",new localstrategy({usernamefield:"email"},
    async (email,passWord, done)=>{
        let user=await Schema.findOne({email:email})
        if(user){
            if(user.passWord==passWord){
                return done(null,user)
            }else{
                return done(null,user)
            }

        }else{
            return done(null,user)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(userId,done)=>{
    let user=await Schema.findById(userId)
    done(null,user)

})

passport.checkauth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/")
    }
}

module.exports=passport;
