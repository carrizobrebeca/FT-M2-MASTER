let traverseDomAndCollectElements = function (matchFunc, startEl = document.body) {
  let resultSet = [];

  // if (typeof startEl === "undefined") {
  //   startEl = document.body;
  // }


  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  if(matchFunc(startEl)) resultSet.push(startEl);


  for (let i = 0; i < startEl.children.length; i++) {
    
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);

    // resultSet = [...resultSet, ...result]
    resultSet = resultSet.concat(result);
  }

  return resultSet;

};


  /*


  body
   |----> div class = 'myClass'
   |       |--->h1
   |       |--->h2 class = 'myClass'
   |       |--->div id = 'myId'
   |            |---> p
   |
   |----> div


  */


// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

let selectorTypeMatcher = function (selector) {
  // '#pagetitle'            // #id   .class   tag.class   tag
  // tu código aquí
  if (selector[0] === "#") return "id";
  else if (selector[0] === ".") return "class";
  else if (selector.includes(".")) return "tag.class";
  else return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function (selector) {
  // '#pagetitle' .pagetitle
  let selectorType = selectorTypeMatcher(selector); // "id"
  let matchFunction;

  if (selectorType === "id") {
    matchFunction = (elemento) => {
      return selector === `#${elemento.id}`; // true / false
    };
  } else if (selectorType === "class") {
    // <div class="price pagetitle otraClase"></div>
    // return selector === `.${elemento}`;

    matchFunction = (elemento) => {
      let classlist = elemento.classList; // [price, pagetitle, otraClase]

      for (let i = 0; classlist.length; i++) {
        if (selector === `.${classlist[i]}`) {
          return true;
        }
      }
      return false;
    };
  } else if (selectorType === "tag.class") {   // <div class="price"></div>  div.price

    //destructuring
    let [tag, clase] = selector.split(".")   //["div", "price"]

    matchFunction = (elemento) => {
      return matchFunctionMaker(tag)(elemento) && matchFunctionMaker("." + clase)(elemento)
    }


  } else if (selectorType === "tag") {
    matchFunction = (elemento) => {
      return elemento.tagName === selector.toUpperCase();
    };
  }



  return matchFunction;
};

const $ = function (selector) {
  let elements; //undefined
  let selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

// let elemento = $("ul")
