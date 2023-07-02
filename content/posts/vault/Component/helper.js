/* eslint-disable */

export function parseTwo(combo){
  if (combo === 'ft'){
    return {
      names: ['0', '1'],
      values: ['z', 'o']
    }
  }
  else if (combo === 'bt'){
    return 'z'
  }
  else {
    return {
      names: ['0', '1', '2'],
      values: ['z', 'o', 't']
    }
  }
}

export function parseThree(combo) {
  if (combo === 'fzz') {
    return {
      names: ['Straight', 'Piked'],
      values: ['s', 'p'],
    };
  }
  if (combo === 'foz') {
    return 's';
  }
  if (combo === 'ftz') {
    return 's';
  }
  if (combo === 'bzz') {
    return 'finished';
  }
  if (combo === 'boz') {
    return 's';
  }
  if (combo === 'btz') {
    return 's';
  }
  if (combo === 'fzo') {
    return {
      names: ['Straight', 'Tucked', 'Piked'],
      values: ['s', 't', 'p'],
    };
  }
  if (combo === 'fto') {
    return {
      names: ['Tucked', 'Piked'],
      values: ['t', 'p'],
    };
  }
  if (combo === 'fzt') {
    return 'finished';
  }
  if (combo === 'foo') {
    return {
      names: ['Straight', 'Tucked', 'Piked'],
      values: ['s', 't', 'p'],
    };
  }
  if (combo === 'bzo') {
    return {
      names: ['Straight', 'Tucked', 'Piked'],
      values: ['s', 't', 'p'],
    };
  }
  if (combo === 'bto') {
    return {
      names: ['Straight', 'Tucked', 'Piked'],
      values: ['s', 't', 'p'],
    };
  }
  if (combo === 'boo') {
    return {
      names: ['Straight', 'Tucked', 'Piked'],
      values: ['s', 't', 'p'],
    };
  }
}

export function parseFour(combo) {
  let tri = combo.slice(0, 3);
  let quad = combo;
  if (quad === 'fzzs') {
    return {
      names: [
        '0',
        '1/2 (180°)',
        '1/1 (360°)',
        '3/2 (540°)',
        '2/1 (720°)',
        '5/2 (900°)',
      ],
      values: ['zero', 'one', 'two', 'three', 'four', 'five'],
    };
  }
  if (quad === 'foop') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }
  if (tri === 'foz') {
    return {
      names: ['0', '1/1 (360°)'],
      values: ['zero', 'two'],
    };
  }
  if (tri === 'ftz') {
    return {
      names: ['0', '1/1 (360°)'],
      values: ['zero', 'two'],
    };
  }
  if (tri === 'bzz') {
    return 'finished';
  }
  if (tri === 'boz') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)'],
      values: ['zero', 'one', 'two', 'three'],
    };
  }
  if (tri === 'btz') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }
  if (quad === 'fzot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)'],
      values: ['zero', 'one', 'two', 'three'],
    };
  }
  if (quad === 'fzop') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }
  if (quad === 'fzos') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)'],
      values: ['zero', 'one', 'two', 'three'],
    };
  }
  if (quad === 'ftot') {
    return 'finished';
  }
  if (quad === 'ftop') {
    return 'finished';
  }
  if (tri === 'fzt') {
    return 'finished';
  }
  if (quad === 'foot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)', '2/1 (720°)'],
      values: ['zero', 'one', 'two', 'three', 'four'],
    };
  }
  if (quad === 'foop') {
    return 'finished';
  }
  if (quad === 'foos') {
    return {
      names: [
        '0',
        '1/2 (180°)',
        '1/1 (360°)',
        '3/2 (540°)',
        '2/1 (720°)',
        '5/2 (900°)',
      ],
      values: ['zero', 'one', 'two', 'three', 'four', 'five'],
    };
  }
  if (quad === 'bzot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)', '2/1 (720°)'],
      values: ['zero', 'one', 'two', 'three', 'four'],
    };
  }
  if (quad === 'foop') {
    return 'finished';
  }
  if (quad === 'foot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)', '2/1 (720°)'],
      values: ['zero', 'one', 'two', 'three', 'four'],
    };
  }
  if (quad === 'bzop') {
    return 'finished';
  }
  if (quad === 'bzos') {
    return {
      names: [
        '0',
        '1/2 (180°)',
        '1/1 (360°)',
        '3/2 (540°)',
        '2/1 (720°)',
        '5/2 (900°)',
      ],
      values: ['zero', 'one', 'two', 'three', 'four', 'five'],
    };
  }
  if (quad === 'btot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }
  if (quad === 'bzop') {
    return 'finished';
  }
  if (quad === 'ftos') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }

  if (quad === 'boot') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)'],
      values: ['zero', 'one', 'two', 'three'],
    };
  }
  if (quad === 'boop') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)'],
      values: ['zero', 'one', 'two'],
    };
  }
  if (quad === 'boos') {
    return {
      names: ['0', '1/2 (180°)', '1/1 (360°)', '3/2 (540°)'],
      values: ['zero', 'one', 'two', 'three'],
    };
  }
}

export function finalVault(str) {
  if (str === 'fzzszero') {
    return [
      'Handspring forward',
      1.0,
      2.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspringvt-e1527974189145.png',
    ];
  }
  if (str === 'fzzsone') {
    return (
      ['Handspring fwd on – 1⁄2 turn (180°) off', 1.01, 2.4],
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring12-e1527974392896.png?w=300&h=382'
    );
  }
  if (str === 'fzzstwo') {
    return [
      'Handspring fwd on – 1/1 turn (360°) off',
      1.02,
      3.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring11-e1527974640198.png?w=300&h=366',
    ];
  }
  if (str === 'fzzsthree') {
    return [
      'Handspring fwd on – 1 1⁄2 turn (540°) off',
      1.03,
      3.6,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring1-5-e1527974751271.png',
    ];
  }
  if (str === 'fzzsfour') {
    return [
      'Handspring fwd on – 2/1 turn (720°) off',
      1.04,
      4.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring-21-e1527974822675.png',
    ];
  }
  if (str === 'fzzsfive') {
    return [
      'Handspring fwd on – 2 1⁄2 turn (900°) off',
      1.05,
      4.4,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring2-5-e1527974904946.png',
    ];
  }
  if (str === 'fzzpzero') {
    return ['Yamashita', 1.1, 2.4];
  }
  if (str === 'fzzpone') {
    return ['Yamashita with 1⁄2 turn (180°) off', 1.11, 2.8];
  }
  if (str === 'fzzptwo') {
    return ['Yamashita with 1⁄2 turn (180°) off', 1.12, 3.2];
  }
  if (str === 'fozszero') {
    return ['Handspring fwd with 1⁄2 turn (180°) on – repulsion off', 1.2, 2.0];
  }
  if (str === 'fozsone') {
    return [
      'Handspring fwd with 1⁄2 turn (180°) on – 1⁄2 turn (180°) off (in either direction)',
      1.21,
      2.8,
    ];
  }
  if (str === 'fozstwo') {
    return [
      'Handspring fwd with 1⁄2 turn (180°) on – 1/1 turn (360°) off',
      1.22,
      3.0,
    ];
  }
  if (str === 'fozsthree') {
    return [
      'Handspring fwd with 1⁄2 turn (180°) on – 1 1/2 turn (540°) off',
      1.23,
      3.6,
    ];
  }
  if (str === 'fozsfour') {
    return [
      'Handspring fwd with 1⁄2 turn (180°) on – 2/1 turn (720°) off',
      1.24,
      4.0,
    ];
  }
  if (str === 'ftzszero') {
    return [
      'Handspring fwd with 1/1 turn (360°) on – Handspring fwd off',
      1.3,
      3.6,
    ];
  }
  if (str === 'ftzstwo') {
    return [
      'Handspring fwd with 1/1 turn (360°) on – 1/1 turn (360°) off',
      1.31,
      4.0,
    ];
  }
  if (str.slice(0, 3) === 'bzz') {
    return [
      'Round-off, flic-flac on – repulsion off',
      1.4,
      2.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/roundoffon-e1527975572336.png',
    ];
  }
  if (str === 'bozszero') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – Handspring fwd off',
      1.5,
      2.6,
      'https://balancebeamsituation.com/round-off-1-2-on/',
    ];
  }
  if (str === 'bozsone') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on –1⁄2 turn (180°) off',
      1.51,
      3.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/roundoff12on12-e1527975717782.png',
    ];
  }
  if (str === 'bozstwo') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – 1/1 turn (360°) off',
      1.52,
      3.4,
      'https://balancebeamsituation.files.wordpress.com/2018/06/roundoff12onfull-e1527975759200.png',
    ];
  }
  if (str === 'bozsthree') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – 1 1⁄2 turn (540°) off',
      1.53,
      3.8,
      'https://balancebeamsituation.com/round-off-1-2-on-1-5-off/',
    ];
  }
  if (str === 'btzszero') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – Repulsion off',
      1.6,
      2.8,
      'https://balancebeamsituation.com/round-off-1-1-on/',
    ];
  }
  if (str === 'btzsone') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – 1/2 turn (180°) off',
      1.61,
      3.2,
      'https://balancebeamsituation.files.wordpress.com/2018/06/roundoff11on12-e1527975923728.png',
    ];
  }
  if (str === 'btzstwo') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – 1/1 turn (360°) off',
      1.62,
      3.8,
      'https://balancebeamsituation.files.wordpress.com/2018/06/roundoff11on11-e1527975960295.png',
    ];
  }
  if (str === 'fzotzero') {
    return [
      'Handspring fwd on – 1⁄2 turn (180°) off',
      2.1,
      4.0,
      'https://balancebeamsituation.files.wordpress.com/2017/01/hs-front-tuck.png',
    ];
  }
  if (str === 'fzotone') {
    return [
      'Handspring fwd on – tucked salto fwd with 1⁄2 turn (180°) off, also – 1⁄2 turn (180°) and tucked salto bwd off',
      2.11,
      4.4,
      'https://balancebeamsituation.files.wordpress.com/2016/12/handspringtuckhalf.png?w=474',
    ];
  }
  if (str === 'fzottwo') {
    return [
      'Handspring fwd on – tucked salto fwd with 1/1 turn (360°) off',
      2.12,
      4.8,
      'https://balancebeamsituation.files.wordpress.com/2017/01/hstuckfull.png?w=199&zoom=2',
    ];
  }
  if (str === 'fzotthree') {
    return [
      'Handspring fwd on – tucked salto fwd with 11⁄2 turn (540°) off',
      2.13,
      5.2,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspringtuck1-5-e1527977862533.png',
    ];
  }
  if (str === 'fzopzero') {
    return [
      'Handspring fwd on – piked salto fwd off',
      2.2,
      4.2,
      'https://balancebeamsituation.files.wordpress.com/2016/12/hspikevault.png?w=183&zoom=2',
    ];
  }
  if (str === 'fzopone') {
    return [
      'Handspring fwd on – piked salto fwd with 1⁄2 turn (180°) off, also – 1⁄2 turn (180°) and piked salto bwd off',
      2.21,
      4.6,
      'https://balancebeamsituation.files.wordpress.com/2016/12/hspike12vault1.png?w=187&zoom=2',
    ];
  }
  if (str === 'fzoptwo') {
    return [
      'Handspring fwd on – piked salto fwd with 1/1 turn (360°) off',
      2.22,
      5.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspringpikefull-e1527978839411.png',
    ];
  }
  if (str === 'fzoszero') {
    return [
      'Handspring fwd on – stretched salto fwd off',
      2.3,
      4.6,
      'https://balancebeamsituation.files.wordpress.com/2016/12/handspringlayout-e1527978964462.png',
    ];
  }
  if (str === 'fzosone') {
    return [
      'Handspring fwd on – stretched salto fwd with 1⁄2 turn (180°) off',
      2.31,
      5.0,
      'https://balancebeamsituation.files.wordpress.com/2016/12/handspring11vault-e1527979699373.png',
    ];
  }
  if (str === 'fzostwo') {
    return [
      'Handspring fwd on – stretched salto fwd with 1/1 turn (360°) off',
      2.32,
      5.4,
    ];
  }
  if (str === 'fzosthree') {
    return [
      'Handspring fwd on – stretched salto fwd with 1 1/2 turn (540°) off',
      2.33,
      5.8,
    ];
  }
  if (str === 'ftotzero') {
    return [
      'Handspring fwd with 1/1 turn (360°) on - tucked salto fwd off',
      2.4,
      5.2,
      'https://balancebeamsituation.files.wordpress.com/2018/06/handspring11ontuck-e1527980655765.png',
    ];
  }
  if (str === 'ftopzero') {
    return [
      'Handspring fwd with 1/1 turn (360°) on - piked salto fwd off',
      2.41,
      5.6,
      'https://balancebeamsituation.files.wordpress.com/2018/06/screen-shot-2018-06-02-at-4-05-28-pm-e1527980756419.png',
    ];
  }
  if (str.slice(0, 3) === 'fzt') {
    return [
      'Handspring fwd on – tucked double salto fwd off',
      2.5,
      6.4,
      'https://balancebeamsituation.files.wordpress.com/2017/01/prod-e1527980802157.png',
    ];
  }
  if (str === 'footzero') {
    return ['Tsukahara tucked', 3.1, 3.5];
  }
  if (str === 'footone') {
    return ['Tsukahara tucked with 1/2 turn (180°) off', 3.11, 3.8];
  }
  if (str === 'foottwo') {
    return ['Tsukahara tucked with 1/1 turn (360°) off', 3.12, 4.1];
  }
  if (str === 'footthree') {
    return ['Tsukahara tucked with 1 1⁄2 turn (540°) off', 3.13, 4.4];
  }
  if (str === 'footfour') {
    return ['Tsukahara tucked with 2/1 turn (720°) off', 3.14, 4.9];
  }
  if (str.slice(0, 4) === 'foop') {
    return ['Tsukahara piked', 3.2, 3.7];
  }
  if (str === 'fooszero') {
    return ['Tsukahara stretched', 3.3, 4.2];
  }
  if (str === 'foosone') {
    return ['Tsukahara stretched with 1⁄2 turn (180°) off', 3.31, 4.4];
  }
  if (str === 'foostwo') {
    return ['Tsukahara stretched with 1⁄1 turn (360°) off', 3.32, 4.8];
  }
  if (str === 'foosthree') {
    return ['Tsukahara stretched with 1 1⁄2 turn (540°) off', 3.33, 5.2];
  }
  if (str === 'foosfour') {
    return ['Tsukahara stretched with 2/1 turn (720°) off', 3.34, 5.6];
  }
  if (str === 'foosfive') {
    return ['Tsukahara stretched with 2 1/2 turn (900°) off', 3.35, 6.0];
  }
  if (str === 'bzotzero') {
    return ['Round-off, flic-flac on – tucked salto bwd off', 4.1, 3.3];
  }
  if (str === 'bzotone') {
    return [
      'Round-off, flic-flac on – tucked salto bwd with 1⁄2 turn (180°) off',
      4.11,
      3.6,
    ];
  }
  if (str === 'bzottwo') {
    return [
      'Round-off, flic-flac on - tucked salto bwd with 1/1 turn (360°) off',
      4.12,
      3.9,
    ];
  }
  if (str === 'bzotthree') {
    return [
      'Round-off, flic-flac on - tucked salto bwd with 1 1/2 turn (540°) off',
      4.13,
      4.2,
    ];
  }
  if (str === 'bzotfour') {
    return [
      'Round-off, flic-flac on - tucked salto bwd with 2/1 turn (720°) off',
      4.14,
      4.7,
    ];
  }
  if (str.slice(0, 4) === 'bzop') {
    return ['Round-off, flic-flac on – piked salto bwd off', 4.2, 3.5];
  }
  if (str === 'bzoszero') {
    return ['Round-off, flic-flac on – stretched salto bwd off', 4.3, 4.0];
  }
  if (str === 'bzosone') {
    return [
      'Round-off, flic-flac on – stretched salto bwd with 1⁄2 turn (180°) off',
      4.31,
      4.2,
    ];
  }
  if (str === 'bzostwo') {
    return [
      'Round-off, flic-flac on – stretched salto bwd with 1/1 turn (360°) off',
      4.32,
      4.6,
    ];
  }
  if (str === 'bzosthree') {
    return [
      'Round-off, flic-flac on – stretched salto bwd with 11⁄2 turn (540°) off',
      4.33,
      5.0,
    ];
  }
  if (str === 'bzosfour') {
    return [
      'Round-off, flic-flac on – stretched salto bwd with 2/1 turn (720°) off',
      4.34,
      5.4,
    ];
  }
  if (str === 'bzosfive') {
    return [
      'Round-off, flic-flac on –stretched salto bwd with 21⁄2 turn (900°) off',
      4.35,
      5.8,
    ];
  }
  if (str === 'btotzero') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – tucked salto bwd off',
      4.4,
      4.0,
    ];
  }
  if (str === 'btotone') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – tucked salto bwd with 1⁄2 turn (180°) off',
      4.41,
      4.4,
    ];
  }
  if (str === 'btottwo') {
    return [
      'Round-off, flic-flac with 1/1 turn (360°) on – tucked salto bwd with 1⁄1 turn (360°) off',
      4.42,
      4.8,
    ];
  }
  if (str === 'btopzero') {
    return [
      'Round-off, flic-flac 1/1 turn (360°) on – piked salto bwd off',
      4.5,
      4.2,
    ];
  }
  if (str === 'btoszero') {
    return [
      'Round-off, flic-flac 1/1 turn (360°) on – stretched salto bwd off',
      4.51,
      4.6,
      'https://balancebeamsituation.files.wordpress.com/2018/06/ro11onlayout-e1528144250308.png',
    ];
  }
  if (str === 'btosone') {
    return [
      'Round-off, flic-flac 1/1 turn (360°) on – stretched salto bwd with 1⁄2 turn (180°) off',
      4.52,
      5.0,
      'https://balancebeamsituation.com/round-off-full-on-back-layout-1-2/',
    ];
  }
  if (str === 'btostwo') {
    return [
      'Round-off, flic-flac 1/1 turn (360°) on – stretched salto bwd with 1⁄1 turn (360°) off',
      4.53,
      5.4,
      'https://balancebeamsituation.files.wordpress.com/2018/06/ro11onlayout11-e1528144379164.png',
    ];
  }
  if (str === 'bootzero') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – tucked salto fwd off',
      5.1,
      4.2,
      'https://balancebeamsituation.com/elite-skill-database/round-off-12-on-tuck-12/',
    ];
  }
  if (str === 'bootone') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – tucked salto fwd with 1⁄2 turn (180°) off, also – 1⁄2 turn (180°) and tucked salto bwd off',
      5.11,
      4.6,
      'https://balancebeamsituation.files.wordpress.com/2017/01/ro12ontuck12-e1528144903450.png',
    ];
  }
  if (str === 'boottwo') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – tucked salto fwd with 1⁄1 turn (360°) off',
      5.12,
      5.0,
      'https://balancebeamsituation.files.wordpress.com/2018/06/ro12ontuck11-e1528144967563.png',
    ];
  }
  if (str === 'bootthree') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – tucked salto fwd with 1 1/2 turn (540°) off',
      5.13,
      5.4,
      'https://balancebeamsituation.files.wordpress.com/2016/12/ro12ontuck1-5.png?w=204&zoom=2',
    ];
  }
  if (str === 'boopzero') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – piked salto fwd off',
      5.2,
      4.4,
      'https://balancebeamsituation.files.wordpress.com/2016/12/omelianchik-e1528145156393.png',
    ];
  }
  if (str === 'boopone') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – piked salto fwd with 1⁄2 turn (180°) off, also – 1⁄2 turn (180°) and piked salto bwd off',
      5.21,
      4.8,
      'https://balancebeamsituation.files.wordpress.com/2016/12/podkovault.png?w=184&zoom=2',
    ];
  }
  if (str === 'booptwo') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – piked salto fwd with 1/1 turn (360°) off',
      5.22,
      5.2,
      'https://balancebeamsituation.files.wordpress.com/2018/06/ro12onpike11-e1528145503543.png',
    ];
  }
  if (str === 'booszero') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – stretched salto fwd off',
      5.3,
      4.8,
      'https://balancebeamsituation.files.wordpress.com/2018/06/ro12onlayout-e1528145565375.png',
    ];
  }
  if (str === 'boosone') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – salto fwd stretched with 1⁄2 turn (180°) off',
      5.31,
      5.2,
      'https://balancebeamsituation.files.wordpress.com/2016/12/lopez-e1528145622288.png',
    ];
  }
  if (str === 'boostwo') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – salto fwd stretched with 1⁄1 turn (360°) off',
      5.32,
      5.6,
      'https://balancebeamsituation.files.wordpress.com/2017/01/ro12onlayoutfull-e1528145764188.png',
    ];
  }
  if (str === 'boosthree') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – salto fwd stretched with 1 1/2 turn (540°) off',
      5.33,
      6.0,
      'https://balancebeamsituation.files.wordpress.com/2017/01/cheng.png?w=177&zoom=2',
    ];
  }
  if (str === 'boosfour') {
    return [
      'Round-off, flic-flac with 1⁄2 turn (180°) on – salto fwd stretched with 2/1 turn (720°) off',
      5.34,
      6.4,
      'https://balancebeamsituation.files.wordpress.com/2019/05/biles.png',
    ];
  }
}
