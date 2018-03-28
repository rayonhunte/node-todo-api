const a = ["cdab", "dcba"]
const b = ["abcd", "abcd"]

const twins = (length,a,b)=>{
  for (i = 0; i < a.length; i++){
    const aStr = a[i].toLowerCase().split("");
    const bStr = b[i].toLowerCase().split("");
    if (aStr.length === bStr.length){
      SwapEven(aStr, bStr)
      SwapOdd(aStr, bStr) 
    }else{
      console.log("no")
      return ["no"]
    }
  } 
}

const SwapEven = (a,b) =>{
a.forEach( (item, i, array)=> {
  if(i % 2 || i == 1){
    let temp = b[i]
    b[i] = a[i]
    a[i] = temp
  }
});
console.log(a +" even a")
console.log(b +" even b")  
}

const SwapOdd = (a,b) =>{
  a.forEach( (item, i, array)=> {
    if(!i % 2 || !i == 1){
      let temp = b[i]
      b[i] = b[i]
      a[i] = temp
    }
  });
  console.log(a +" even a")
  console.log(b +" even b")  
  }

twins(2,a,b)


