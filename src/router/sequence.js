const nextSeq=function() {
  let seq = JSON.parse(localStorage.getItem("seq"));
  localStorage.setItem("seq", seq + 1);
  return localStorage.getItem("transId") + seq;
}

export {
  nextSeq,
}
