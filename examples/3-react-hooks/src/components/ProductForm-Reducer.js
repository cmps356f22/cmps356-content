import React, { useReducer, useRef, useState } from "react";
import { productReducer, INITIAL_STATE } from "./productFormReducer";

const ProductForm2 = () => {
  //Using a reducer
  const [product, dispatch] = useReducer(productReducer, INITIAL_STATE);
  const tagRef = useRef();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleTags = () => {
    const tags = tagRef.current.value.split(",");
    dispatch({ type: "ADD_TAG", payload: tags });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(product));
  };

  return (
   <>
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        type="text"
        name="title" id="title"
        onChange={handleChange}
        placeholder="Title"
      />
      <label htmlFor='desc'>Description</label>
      <input
        type="text"
        name="desc" id="desc"
        onChange={handleChange}
        placeholder="Description"
      />
      <label htmlFor='price'>Price</label>
      <input
        type="number"
        name="price" id="price"
        onChange={handleChange}
        placeholder="Price"
      />
      <label htmlFor='category'>Category</label>
      <select name="category" id="category" onChange={handleChange}>
        <option value="sneakers">Sneakers</option>
        <option value="tshirts">T-shirts</option>
        <option value="jeans">Jeans</option>
      </select>
      <label htmlFor='tags'>Tags</label>
      <span className="grid-2cols">
        <textarea
          ref={tagRef} id="tags"
          placeholder="Seperate tags with commas..."
        ></textarea>
        <button type="button" onClick={handleTags}>
          Add Tags
        </button>
      </span>
      <div className="tags">
        {product.tags.map((tag) => (
          <small
            onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })}
            key={tag}
          >
            {tag}
          </small>
        ))}
      </div>
      <br />
      <div className="quantity">
          <button onClick={() => dispatch({ type: "DECREASE" })} type="button">
            -
          </button>
          <span>Quantity ({product.quantity})</span>
          <button onClick={() => dispatch({ type: "INCREASE" })} type="button">
            +
          </button>
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div>
        {JSON.stringify(product)}
      </div>
   </>
  );
};

export default ProductForm2;
