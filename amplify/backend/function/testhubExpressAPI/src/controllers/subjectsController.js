const _ = require('lodash');
const Subject = require('../models/Subject');

const getSubjectQuestions = async (req, res) => {
  const { subject } = req.params;
  try {
    const subjectData = await Subject.findOne({ name: subject });
    if (!subjectData) {
      return res.status(400).json({ message: 'No matching subject found!' });
    }
    let { questions } = subjectData;
    questions = questions.sort(() => Math.random() - 0.5);
    return res.json({ questions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something went wrong!', error });
  }
};

const updateSubjectQuestions = async (req, res) => {
  const { subject } = req.params;
  const { newQuestions } = _.pick(req.body, ['questions']);

  try {
    const { questions } = await Subject.findOneAndUpdate(
      { name: subject },
      { questions: newQuestions }
    );
    res.json({
      success: 'Questions updated successfully!',
      questions,
    });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!', error });
  }
};

module.exports = { getSubjectQuestions, updateSubjectQuestions };
