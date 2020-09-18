const _ = require('lodash');
const Subject = require('../models/Subject');

const getSubjectQuestions = async (req, res) => {
  const { subject } = req.params;
  console.log(subject);
  try {
    const subjectData = await Subject.findOne({ name: subject });
    if (!subjectData) {
      return res.status(400).json({ message: 'No matching subject found!' });
    }
    const { questions } = subjectData;
    console.log(questions);
    let data = questions.map((q) => ({
      _id: q._id,
      id: q.id,
      question: q.question,
      options: {
        a: q['option-a'],
        b: q['option-b'],
        c: q['option-c'],
        d: q['option-d'],
      },
      answer: q.answer,
    }));
    data = data.sort(() => Math.random() - 0.5);
    console.log(data);
    return res.json({ questions: data });
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
