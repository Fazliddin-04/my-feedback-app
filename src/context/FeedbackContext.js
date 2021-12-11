import { createContext, useState } from "react";
import { v4 as uuid4v } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10
    },
    {
      id: 2,
      text: 'This is feedback item 2',
      rating: 7
    },
    {
      id: 3,
      text: 'This is feedback item 2',
      rating: 9
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  // Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuid4v()
    setFeedback([newFeedback, ...feedback]);
  }


  // Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update Feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  }

  // Edit Feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{ feedback, feedbackEdit, deleteFeedback, addFeedback, editFeedback, updateFeedback }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext