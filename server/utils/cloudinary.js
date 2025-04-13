// to store images in cloudinary we use it as vercel does not allow file access and tmp folder is not for permanent storage
const {v2 : cloudinary} =require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dt7crhnpm', 
  api_key: '784155382655383', 
  api_secret: 'hLJMXPqx7fU1d_fIMtOebSpM4ss' 
});
module.exports=cloudinary