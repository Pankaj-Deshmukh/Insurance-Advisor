require('dotenv').config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const zod = require("zod");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const router = Router();


const signupSchema = zod.object({
      email: zod.string().email(),
      name: zod.string().min(3),
      password: zod.string()
})

router.post("/signup", async(req, res) => {
      const {data, success} = await signupSchema.safeParse(req.body);
      console.log(data);
      if (!success)
      {
            return res.json({
                  msg: "wrong input details"
            });
      }
      try {
            console.log(process.env.HASH_SECRET);
            const user = await prisma.users.create({
                  data: {
                        email: data.email,
                        name: data.name,
                        password: await bcrypt.hash(data.password, parseInt(process.env.HASH_SECRET))
                  },
                  select: {
                        id: true,
                        name: true
                  }
            });
            const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET); 
            return res.status(200).json({
                  token,
                  name: user.name
            })
      } catch(err) {
            console.log(err);
            return res.status(500).json({
                  msg: "user already exists or server error"
            });
      }
});

const signinSchema = zod.object({
      email: zod.string().email(),
      password: zod.string()
})

router.post("/signin", async(req, res) => {
      const { success, data } = signinSchema.safeParse(req.body);
      if( !success ) {
            return res.status(500).json({
                  msg: "wrong inputs sent"
            });
      }
      try {
            const existingUser = await prisma.users.findFirst({
                  where: {
                        email: data.email
                  },
                  select: {
                        name: true,
                        password: true,
                        id: true
                  }
            });
            if(existingUser)
            {
                  console.log(existingUser.password);
                  console.log(data.password);
                  const passwordValidation = await bcrypt.compare(data.password, existingUser.password);
                  if(passwordValidation)
                  {
                        const token = await jwt.sign({id: existingUser.id}, process.env.JWT_SECRET);
                        return res.status(200).json({
                              token,
                              name: existingUser.name
                        })
                  }
                  return res.status(500).json({
                        msg: "wrong password sent"
                  });
            }
            return res.status(500).json({
                  msg: "user not found"
            });
            
      } catch(err) {
            console.log(err);
            return res.status(500).json({
                  msg: "user not found"
            });
      }
});

router.post("/isauthorized",authMiddleware, async(req, res) => {
      return res.status(200).json({
            message: "good to go"
      })
})


module.exports = router