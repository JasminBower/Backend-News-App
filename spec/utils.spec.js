const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns a different array', () => {
    expect(formatDates([])).to.eql([])
  });
  it('tests for correct keys in a single element array', () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      title: "They're not exactly dogs, are they?",
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    formatDates(input);
    expect(input[0]).to.contain.keys(['body', 'author', 'title','votes', 'created_at'])
  });
  it('returns correct javascript timestamp for single element array', () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      title: "They're not exactly dogs, are they?",
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    const [actual] = formatDates(input);
    const isDate = actual.created_at instanceof Date;

    expect(isDate).to.eql(true);
  })
  it('returns javascript time stamps for a multiple element array', () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }];

    const [actual] = formatDates(input);
    const isDate = actual.created_at instanceof Date;


    expect(isDate).to.eql(true)

  })
  it('original input does not mutate', () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];

    formatDates(input);

    expect(input).to.eql([{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }])
  });
});

describe('makeRefObj', () => {
  it('returns an object', () => {
    expect(makeRefObj([])).to.eql({});
  });
  it('for an array of one object returns correct key value pair', () => {
    const input = [{article_id: 1, title: 'Hi'}];
    const expected = {'Hi': 1};
    const actual = makeRefObj(input);
    expect(actual).to.eql(expected);
  });
  it('for an array of multiple objects returns correct key vaue piars', () => {
  const input = [{article_id: 1, title: 'Hi'},{article_id: 2, title: 'Bye'}, {article_id: 3, title: 'Felicia'}];
  const expected = {'Hi': 1, 'Bye': 2, 'Felicia': 3};
  expect(makeRefObj(input)).to.eql(expected);
  });
  it('should not mutate the origial array', () => {
    const input = [{article_id: 1, title: 'Hi'}];
    makeRefObj(input);
    expect(input).to.eql([{article_id: 1, title: 'Hi'}]);
    expect(input).to.not.eql([{article_id: 1, title: 'Bye'}])
  })
});

describe('formatComments', () => {
  it('returns a new array', () => {
    expect(formatComments([], {})).to.eql([]);
  });
  it('in a single element array, returns correctly modified array', () => {
    const input = [{
      body: "I am 100% sure that we're not completely sure.",
      belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
      created_by: 'butter_bridge',
      votes: 1,
      created_at: 1069850163389,
    }];
    const createdAtDate = new Date(1069850163389);
   
    const refObj = {'UNCOVERED: catspiracy to bring down democracy': 1};
   
    const expected = [{
      body: "I am 100% sure that we're not completely sure.",
      article_id: 1,
      author: 'butter_bridge',
      votes: 1,
      created_at: new Date(1069850163389)
    }];

   

    const actual = formatComments(input, refObj);

    expect(actual).to.eql(expected);

  });
  it('when passed multiple objects in an array, returns updated array', () => {
    const input = [{
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    },
    {
      body: ' I carry a log — yes. Is it funny to you? It is not to me.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: -100,
      created_at: 1416746163389,
    }];

    const refObj = {'Living in the shadow of a great man': 1, 'something funky': 2};

    const actual = formatComments(input, refObj);

    const expected = [{
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      article_id: 1,
      author: 'butter_bridge',
      votes: 14,
      created_at: new Date(1479818163389),
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      article_id: 1,
      author: 'icellusedkars',
      votes: 100,
      created_at: new Date(1448282163389),
    },
    {
      body: ' I carry a log — yes. Is it funny to you? It is not to me.',
      article_id: 1,
      author: 'icellusedkars',
      votes: -100,
      created_at: new Date(1416746163389),
    }];

    expect(actual).to.eql(expected);


  });
  it('does not mutate original array', () => {
    const input = [{
      body: "I am 100% sure that we're not completely sure.",
      belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
      created_by: 'butter_bridge',
      votes: 1,
      created_at: 1069850163389,
    }];
    const objectRef = {'UNCOVERED: catspiracy to bring down democracy': 1};

   formatComments(input, objectRef);

   expect(input).to.eql([{
    body: "I am 100% sure that we're not completely sure.",
    belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
    created_by: 'butter_bridge',
    votes: 1,
    created_at: 1069850163389,
  }]);

  expect(input).to.not.eql([{
    body: "I am 100% sure that we're not completely sure.",
    article_id: 1,
    author: 'butter_bridge',
    votes: 1,
    created_at: 1069850163389
  }])
  })
});
