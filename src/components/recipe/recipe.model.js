import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details : {
    type : String
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
