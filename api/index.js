const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  enum TaskStatus {
    COMPLETED
    NOT_COMPLETED
    AVOIDED
    UNKNOWN
  }

  type User {
    USER_ID: ID!
    USERNAME: String
    PASSWORD: String
    NAME: String
    CREATION_DATE: timestamptz
  }

  type Task {
    TASK_ID: ID!
    NAME: String
    SUBJECT: String
    TIME_LENGTH: Int
    TIME_OF_DAY: [String]
  }

  type TaskLog {
    TASK_LOG_ID: ID!
    USER_ID: ID!
    TASK_ID: ID!
    STATUS: TaskStatus
    DATE_TIME: timestamptz
  }

  type Query {
    user: User
    tasks: [Task]
  }
`;

const users = [
  {
    USER_ID: 0,
    USERNAME: 'Jack',
    PASSWORD: 'asdf',
    CREATION_DATE: '6/15/2021'
  },
  {
    USER_ID: 1,
    USERNAME: 'asdf',
    PASSWORD: 'Jack',
    CREATION_DATE: '6/15/2021'
  },
];

const tasks = [
  {
    TASK_ID: 0,
    NAME: 'Pushup Workout',
    SUBJECT: 'Do 50 reps of pushups for at least 5 sets. Good Luck!',
    TIME_LENGTH: 30,
    TIME_OF_DAY: ['Anytime', 'Morning', 'Afternoon', 'Night']
  },
  {
    TASK_ID: 1,
    NAME: 'Pullup Workout',
    SUBJECT: 'Do 20 reps of pullups for at least 5 sets. Good Luck!',
    TIME_LENGTH: 30,
    TIME_OF_DAY: ['Anytime', 'Morning', 'Afternoon', 'Night']
  },
  {
    TASK_ID: 2,
    NAME: 'Read',
    SUBJECT: 'Exercise that brain. Fun read!',
    TIME_LENGTH: 60,
    TIME_OF_DAY: ['Afternoon', 'Night']
  },
  {
    TASK_ID: 3,
    NAME: 'Practice some Spanish',
    SUBJECT: `Exercise that brain. Practice another language with a level you're comfortable with`,
    TIME_LENGTH: 60,
    TIME_OF_DAY: ['Morning', 'Night']
  },
];

const resolvers = {
  Query: {
    tasks: () => {
      return tasks;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});