const {Pool}=require('pg')

const pool=new Pool({
    host:"localhost",
    user:"postgres",
    password:"11",
    port:"5432",
    database:"ocr_app",
});


const pg=async(SQL,...values)=>{
   const client=await pool.connect()

   try {

    const {rows}=await client.query(SQL,values.length ? values : null)
return rows;        
    } catch (error) {
        console.log(error);
    }

    finally{
        client.release()
    }
}


module.exports=pg;