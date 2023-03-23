const p2 = new Promise((resolve, reject) => {
  console.log("2");
  setTimeout(() => {
    resolve("두번째 프롬이스의 결과값입니다");
  }, 6000);
});

const p1 = new Promise((resolve, reject) => {
  console.log("1");
  setTimeout(() => {
    resolve("첫번째 프롬이스의 결과값입니다");
  }, 3000);
});

p1.then((res) => {
  console.log(res);
});

p2.then((res) => {
  console.log(res);
});
