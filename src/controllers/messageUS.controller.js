const pg = require("../libs/pg")

const messageUS = async (req, res) => {
    try {
        const { your_name, email, message_list } = req.body;
            console.log(req.body);
        // Ma'lumotlarning mavjudligini tekshirish
        if (!your_name || !email || !message_list) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // pg funksiyasiga SQL so'rovini va parametrlarni to'g'ri yetkazish
        await pg(`insert into messages(your_name, email, message_list) values($1, $2, $3)`, 
        your_name, email, message_list);

        res.status(200).json("Message succesfully")
    
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
};

module.exports={
    messageUS,
}