const CreditCard = require("../models/CreditCard");
const asyncHandler = require('express-async-handler');

const addCreditCard=async(req,res)=>{
    try{
        const {userId,cardNumber,expMonth,expYear,cvv,cardName}=req.body

        if(!userId || !cardNumber || !expMonth || !expYear ||! cvv || !cardName){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
              });
        }

    const newCard=new CreditCard({
        userId,
        cardNumber,
        cardName,
        expMonth,
        expYear,
        cvv
    })

    await newCard.save()
    res.status(201).json({
        success: true,
        data: newCard,
      });
    }catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Error",
        });
      }
}


const fetchAllCreditCards = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const cardList = await CreditCard.find({ userId });

    res.status(200).json({
      success: true,
      data: cardList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getSingleCreditCard = asyncHandler(async (req, res) => {
  const creditcard = await CreditCard.findById(req.params.creditId);

  if (creditcard) {
      res.status(200).json(creditcard);
  } else {
      res.status(404);
      throw new Error('Credit Card not found');
  }
});

const editCreditCard = async (req, res) => {
  try {
    const { userId, creditId } = req.params;
    const formData = req.body;

    if (!userId || !creditId) {
      return res.status(400).json({
        success: false,
        message: "User and credit card id is required!",
      });
    }

    const creditcard = await CreditCard.findOneAndUpdate(
      {
        _id: creditId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!creditcard) {
      return res.status(404).json({
        success: false,
        message: "Credit Card not found",
      });
    }

    res.status(200).json({
      success: true,
      data: creditcard,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCreditCard = async (req, res) => {
  try {
    const { userId, creditId } = req.params;
    if (!userId || !creditId) {
      return res.status(400).json({
        success: false,
        message: "User and creditId is required!",
      });
    }

    const creditcard = await CreditCard.findOneAndDelete({ _id: creditId, userId });

    if (!creditcard) {
      return res.status(404).json({
        success: false,
        message: "Credit Card not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "creditCard deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addCreditCard, getSingleCreditCard,editCreditCard, fetchAllCreditCards, deleteCreditCard };