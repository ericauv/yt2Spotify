import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import Mutation from '../src/resolvers/Mutation';
import mockYTResponse from '../mocks/mockYTResponse';
import typeDefs from '../src/schema';
import 'babel-polyfill';

const allMutationTestCase = {
  id: 'All Mutation Test Case',
  mutation: `
  mutation {changeHello(cool:"letsssseee")}
  `,
  variables: {},

  // injecting the mock movie service with canned responses
  context: { ytResponse: mockYTResponse },

  // expected result
  expected: {
    data: {
      changeHello: 'letsssseee Hello'
    }
  }
};

describe('My Test Cases', () => {
  // array of all test cases, just 1 for now
  const cases = [allMutationTestCase];
  const resolvers = { Mutation };
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // running the test for each case in the cases array
  cases.forEach(obj => {
    const { id, mutation, variables, context, expected } = obj;

    it('tests mutation', async () => {
      const result = await graphql(schema, mutation, null, context, variables);
      return expect(result).toEqual(expected);
    });
  });
});
