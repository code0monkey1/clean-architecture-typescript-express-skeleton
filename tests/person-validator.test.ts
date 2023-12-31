import { RegisterValidator } from '../src/utils/interfaces/validator';

export type Person = {
  name: string;
};

// export default interface Validator<T> {
//   validate(body: unknown): T | Error;
// }
export interface ValidationLibrary<T> {
  validate(
    body: unknown
  ): Promise<{ success: boolean; errors: unknown; data: T | null }>;
}

describe.only('ValLibImpl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let val_lib: ValidationLibrary<Person>;

  beforeEach(() => {
    val_lib = new RegisterValidator();
  });

  it('should return a Person object when the body is valid', async () => {
    const body = {
      name: 'Hiran',
      email: 'v@gmail.co',
      confirm_email: 'v@gmail.co',
      password: 'hello123',
      confirm_password: 'hello123',
    };

    const result = await val_lib.validate(body);
    expect(result.data).toEqual(body);
  });

  it.each([
    {
      body: {
        name: 'Hiran',
        email: 'v@gmail.co',
        confirm_email: 'v@gmail.co',
        password: 'hello123',
      },
    },
    {
      body: {
        name: 'Hiran',
        email: 'v@gmail.co',
        confirm_email: 'v@gmail.co',
        password: 'hello123',
      },
    },

    {
      body: {
        name: 'Hiran',
        email: 'v@gmail.co',
        confirm_email: 'v@gmail.co',
        password: 'hello123',
      },
    },
  ])('when confirm password not the same , should say so', async ({ body }) => {
    const { errors } = await val_lib.validate(body);

    expect(errors).toStrictEqual({
      formErrors: [],
      fieldErrors: {
        confirm_password: ['Required'],
      },
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
