/**
 * 해당 컬럼이 힌트와 일치한지 확인하는 함수
 * @param cur         컬럼힌트 인덱스
 * @param info
 * @param arr
 * @returns {boolean}
 */
function colCheck(cur, info, arr) {
  const { width, height, columnHints, rowHints } = info;
  const colLen = columnHints[cur].length;
  let idx = 0, cnt = 0;
  let promising = false;
  for(let i=0; i<height; i++) {
    cnt += arr[i][cur];
    if(cnt > 0) { // 쿠키가 있고
      // 유망하다고 넘겼지만 다른 곳에 쿠키가 있다면
      if(promising === true) return false;
      // 쿠키가 있지만 힌트는 비어있을때
      if(idx >= colLen) return false;
    }
    if(arr[i][cur] === 1 && arr[i+1][cur] === 0) {
      const tmp = columnHints[cur][idx];
      if(cnt === tmp) { // 힌트와 알맞다면
        cnt = 0;
        idx++;
      } else if(cnt < tmp) { // 유망하다면
        promising = true;
        cnt = 0;
        idx++;
      } else { // 힌트에 맞지 않다면
        return false;
      }
    }
  }
  return true;
}

// solve.js
function solve(width, height, columnHints, rowHints) {

  // init
  const info = { width, height, columnHints, rowHints };
  let arr = [];
  for(let i=0; i<height+1; i++) {
    arr.push([]);
    for(let j=0; j<width; j++) arr[i].push(0);
  }

  /**
   * 백트래킹으로 라인을 채워나간다 (브루트 포스)
   * @param i       rowHints 인덱스
   * @param idx     arr 변수의 로우 인덱스
   * @param cnt     rowHints[i] 인덱스
   * @param prev    이전의 값이 채워져있는지 체크
   * @param info    가로, 세로, 컬럼힌트, 로우힌트
   * @param arr     정답 배열, 이차원 배열로 정답을 채워나간다
   */
  function getCookieBox(i, idx, cnt, prev, info, arr) {
    let resultArray = [];
    let flag = false;

    function backtracking(i, idx, cnt, prev, info, arr) {
      const { width, height, columnHints, rowHints } = info;

      // 최소한의 정답이 나왔으면 flag를 true로 바꾼다.
      // flag는 함수가 더 이상 재호출되지 않게 한다.
      if(flag) return;

      // 모두 다 채워지면
      if(i === height) {
        for(let p=0; p<width*height; p++) {
          resultArray.push(arr[parseInt(p/width)][p%width]);
        }
        flag = true;
        return;
      }

      // 기저 사례
      if(idx > width) return;
      if(i > rowHints.length) return;
      if(cnt > rowHints[i].length) return;
      if(rowHints[i].length === 0) {
        backtracking(i + 1, 0, 0, false, info, arr);
        return;
      }

      // 한 줄을 다 채웠으면
      if(cnt === rowHints[i].length && idx === width) {
        backtracking(i + 1, 0, 0, false, info, arr);
        return;
      }

      // 현재 row를 계속 채움
      if(prev === false) {
        const dl = idx+rowHints[i][cnt] > width ? width : idx+rowHints[i][cnt];
        let next = true;
        for(let cur=idx; cur<dl; cur++) {
          arr[i][cur] = 1;
          // row를 채워가면서 채운 쪽 column을 체크한다
          if(columnHints[cur].length === 0) {
            next = false;
            break;
          }
          if(colCheck(cur, info, arr) === false) {
            next = false;
            break;
          }
        }
        if(next === true) backtracking(i, idx+rowHints[i][cnt], cnt+1, true, info, arr);
        for(let cur=idx; cur<dl; cur++) arr[i][cur] = 0;
      }
      // 그냥 채우지 않고 넘어감
      backtracking(i, idx+1, cnt, false, info, arr);
    }

    backtracking(i, idx, cnt, prev, info, arr);
    return resultArray;
  }

  // 백트래킹
  const res = getCookieBox(0, 0, 0, false, info, arr);

  const answer = [];
  for(let i=0; i<height; i++) {
    answer.push([]);
    for(let j=0; j<width; j++) answer[i].push(res[i*width+j]);
  }

  return answer;
}

exports.nonogramSolve = solve;