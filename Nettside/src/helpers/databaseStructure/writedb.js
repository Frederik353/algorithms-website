
import { database } from "../config"

import  { question } from "./questions.js"   



for (i = 0; i > 100; i++){
    database.ref("questions").push(question);
}