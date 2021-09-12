/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from 'axios';
import { request } from './request';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

test('can get some data', async () => {
  const expectedResult = 'OK';
  (axios.request as jest.Mock).mockResolvedValue({ data: expectedResult });

  const url = 'someUrl';
  const result = await request(url);

  expect(axios.request).toHaveBeenCalledTimes(1);
  expect(axios.request).toHaveBeenCalledWith({
    url,
    method: 'GET',
    timeout: 0,
  });
  expect(result).toBe(expectedResult);
});

test('can post some data', async () => {
  const expectedResult = 'OK';
  (axios.request as jest.Mock).mockResolvedValue({ data: expectedResult });

  const url = 'someUrl';
  const result = await request(url, { method: 'POST' });

  expect(axios.request).toHaveBeenCalledTimes(1);
  expect(axios.request).toHaveBeenCalledWith({
    url,
    method: 'POST',
    timeout: 0,
  });
  expect(result).toBe(expectedResult);
});

test('can handle error codes', async () => {
  (axios.request as jest.Mock).mockRejectedValue({ response: 'somehting ' });

  await expect(request('someUrl')).rejects.toThrow(
    /Server responded with error/i
  );
});

test('can handle unresponsive server', async () => {
  (axios.request as jest.Mock).mockRejectedValue({ request: 'somehting ' });

  await expect(request('someUrl')).rejects.toThrow(
    /The server is not available/i
  );
});

test('can handle client error', async () => {
  (axios.request as jest.Mock).mockRejectedValue({});

  await expect(request('someUrl')).rejects.toThrow(/A client error happened/i);
});
