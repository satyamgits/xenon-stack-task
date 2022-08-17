const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');


exports.postSignUp = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;

    try{
        const currentUser = await User.findOne({ email: email });
        if(currentUser){
            return res.status(409).json({ msg: 'User already Registered. Please Login into your account'});
        }else{
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                name: name,
                password: hashedPassword,
                email: email,
                username: username
            })

            const result = await user.save();
            console.log(result);

            res.status(201).json({data: result, msg : "User Registered"});
        }
    }
    catch(error) {
        console.log(error);
    }

}

exports.postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const currentUser = await User.findOne({ username: username });
        if(!currentUser){
            return res.status(401).json({msg: 'User not exist. Please SignUp first then try again'})
        }else{
            const passwordMatch = await bcrypt.compare(password, currentUser.password);
            if(!passwordMatch){
                return res.status(401).json({ msg: 'Wrong Password'})
            }else{
                const token = jwt.sign({
                    email: currentUser.email,
                    userId: currentUser._id.toString(),
                    name: currentUser.name,
                    username: currentUser.username
                },
                process.env.SECRET_KEY
                );
                res.status(200).json({
                    token: token,
                    name: currentUser.name,
                    email: currentUser.email,
                    username: currentUser.username
                });
            }
        }
    }
    catch(error) {
        console.log(error);
    }
}

exports.getLoginData = async ( req, res) => {
    const authHeader =req.get('Authorization')
    if(!authHeader){
        return res.status(401).json({ msg :'Not authenticated'});
    } 
    const token = authHeader.split(' ')[1];
    // console.log(token)
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    
    
        const email = decodedToken.email;
        const response = await User.findOne({ email: email });

        if(!response){
            return res.status(401).json({ msg: 'User not Found'})
        }

        
        
        
        return res.status(201).json({ data: response  })

    }catch(err){
    console.log(err);
}
}