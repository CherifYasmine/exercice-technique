var express = require("express");
const {Card} = require("../models/Card");
const { Column } = require("../models/Column");
var router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(404).json({ message: err });
    }

});

router.get("/:cardId", async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        res.status(200).json(card);
    } catch (err) {
        res.status(404).json({ message: err });
    }

});

router.post("/", async (req, res) => {
    try {
        const { name, description, assignee, columnId  } = req.body;
        const columnn = await Column.findById(columnId);
        console.log(columnn);
        const card = new Card({
            name: name,
            description: description,
            assignee: assignee,
            status: columnn.name
        });
        const savedCard = await card.save();

        
        const column = await Column.findByIdAndUpdate({_id: columnId}, {
            $push: {
                cards: savedCard,
            },
        })
        res.send(savedCard);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.put("/", async(req, res) => {
    const { cardId, name, description, assignee  } = req.body;
    try {
        const card = await Card.updateOne({ _id: cardId },
            {
                name: name,
                description: description,
                assignee: assignee,
            }
        );
        res.status(200).json(card);
    } catch (e) {
        res.send(e);
    }
});

router.delete("/:cardId", async(req, res) => {
    try {
        const removedCard = await Card.remove({ _id: req.params.cardId });
        res.status(200).json(removedCard);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
module.exports = router;