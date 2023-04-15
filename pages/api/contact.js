async function handler(req, res) {
    if (req.method === "POST") {
        const {email, name, message} = req.body;

        if (!name || name.trim() === '') {
            res.status(422).json({message: 'Invalid input.'})
            return;
        }

        //Store it in a database

        const newMessage = {
             name
        }
        res.status(201).json({message: 'Successfully stored message!', data: newMessage})
    }

}

export default handler;