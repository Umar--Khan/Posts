//FreqWords - Sort by highest function
export const sortList = list => {
  let top5Words = "";
  let arr = Object.keys(list).sort((a, b) => list[b] - list[a]);
  top5Words = arr.slice(0, 5);
  return top5Words;
};

//FreqWords - Tally function
const wordFreq = post => {
  const words = post.body.replace(/[.]/g, "").split(/\s/);
  let freqMap = {};
  words.forEach(w => {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });
  return freqMap;
};

//FreqWords - Tally function
export const wordListMap = (posts, state) => {
  const res = {};
  const list = posts.map(post => wordFreq(post));
  [...list].map(item => {
    Object.keys(item).map(iter => {
      if (res.hasOwnProperty(iter)) {
        res[iter] = res[iter] + item[iter];
      } else {
        res[iter] = item[iter];
      }
    });
  });
  return sortList(res);
};

export const countWords = (str, state) => {
  state.wordCount += str.body.match(/(\w+)/g).length;
};

export const deductCount = (str, state) => {
  state.wordCount -= str.match(/(\w+)/g).length;
};
