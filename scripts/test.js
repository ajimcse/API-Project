function getTimeString(time){
   let hour= parseInt(time /3600);
   let reminingSecont=time % 3600;
   let minute=parseInt(reminingSecont /60);
   reminingSecont =reminingSecont % 60;
   return `${hour} hour ${minute} minute ${reminingSecont} second ago`
}
console.log(getTimeString(20030));
// const result=getTimeString(23221);
// console.log(result);