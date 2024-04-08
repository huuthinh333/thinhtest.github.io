// ProductForm.js
import React from 'react';
import Form from '@rjsf/core';
import AjvValidator from '@rjsf/validator-ajv8';

const ProductForm = ( ) => {
  const schema = {
    "type": "object",
    "properties": {
      
      "items": {
        "title":"mã giảm giá",
        "type": "array",
        "items": {
          "type": "object",
          "anyOf": [
            {
              "properties": {
                "foo": {
                  "type": "string"
                }
              }
            },
            {
              "properties": {
                "bar": {
                  "type": "string"
                }
              }
            }
          ]
        }
      }
    },
    "anyOf": [
      {
        "title": "Không sử dụng mã giảm giá",
         "type":"string"
      },
      {
        "title": "Sử dụng mã giảm giá",
        "properties": {
          "discount": {
            "enum": [0.1, 0.2]
          }
        },
        "required": ["discount"]
      }
    ]
  };
  

  const uiSchema = {

    products: {
      "ui:options": {
        orderable: false,
      },
      items: {
 
      },
    },

  };
  const onSubmit = ({ formData }) => {
    console.log('Form submitted with data:', formData);
  };
  return (
    <div>
      <Form
        schema={schema}

 uiSchema={uiSchema}
        onSubmit={onSubmit}
     
        validator={AjvValidator}
      />
    </div>
  );
};

export default ProductForm;
