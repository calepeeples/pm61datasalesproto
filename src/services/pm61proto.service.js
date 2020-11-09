import firebase from "../firebase";

const db = firebase.ref("/pages/Questions");

class QuestionDataService {
  getAll() {
    //return db;
    return db;
  }

  create(question) {
    return db.push(question);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new QuestionDataService();
