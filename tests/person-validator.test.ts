export type Person = {
  name: string;
};

export default interface Validator<T> {
  validate(body: unknown): T | Error;
}
export interface ValidationLibrary<T> {
  validate(
    body: unknown
  ): Promise<{ success: boolean; errors: unknown; data: T | null }>;
}
import { RegisterValidator } from '../src/utils/interfaces/validator';

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

  it('should return a ZodError when a person does not have a name filed', async () => {
    const body = {
      name: 'Hiran',
      email: 'v@gmail.co',
      confirm_email: 'v@gmail.co',
      password: 'hello123',
    };
    const { errors } = await val_lib.validate(body);

    expect(errors).toStrictEqual({
      fieldErrors: {
        confirm_email: ['Required'],
        confirm_password: ['Required'],
        formErrors: [],
      },
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
