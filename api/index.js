const { ApolloServer, gql } = require('apollo-server');
//const { timestamptz } = require('graphql-scalars');

const typeDefs = gql`
  enum TaskStatus {
    COMPLETED
    NOT_COMPLETED
    AVOIDED
    UNKNOWN
  }

  type User {
    id: ID!
    username: String!
    password: String!
    name: String!
    #creation_date: timestamptz!
  }

  type Task {
    id: ID!
    name: String!
    subject: String!
    time_length: Int!
    time_of_day: [String]! # Valid: [], [...some data]
  }

  type TaskLog {
    id: ID!
    user_id: ID!
    task_id: ID!
    statis: TaskStatus!
    #DATE_TIME: timestamptz!
  }

  type Query {
    user(id: ID): User
    task(id: ID): Task
    tasks: [Task]
  }
`;

const users = [
  {
    id: 0,
    username: 'Jack',
    password: 'asdf',
  },
  {
    id: 1,
    username: 'asdf',
    password: 'Jack',
  },
];

const tasks = [
  {
    id: "sadf",
    name: 'Pushup Workout',
    subject: 'Do 50 reps of pushups for at least 5 sets. Good Luck!',
    time_length: 30,
    time_of_day: ['Anytime', 'Morning', 'Afternoon', 'Night']
  },
  {
    id: "asdf",
    name: 'Pullup Workout',
    subject: 'Do 20 reps of pullups for at least 5 sets. Good Luck!',
    time_length: 30,
    time_of_day: ['Anytime', 'Morning', 'Afternoon', 'Night']
  },
  {
    id: "fdsa",
    name: 'Read',
    subject: 'Exercise that brain. Fun read!',
    time_length: 60,
    time_of_day: ['Afternoon', 'Night']
  },
  {
    id: "dasf",
    name: 'Practice some Spanish',
    subject: `Exercise that brain. Practice another language with a level you're comfortable with`,
    time_length: 60,
    time_of_day: ['Morning', 'Night']
  },
];

const resolvers = {
  Query: {
    user: (obj, { id }, context, info) => {
      return users.find(user => user.id === id);
    },
    task: (obj, { id }, context, info) => {
      return tasks.find(task => task.id === id);
    },
    tasks: () => {
      return tasks;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});