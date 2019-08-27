import session from 'react-session-persist';
import saveSessionHeaders from 'api/utils/saveSessionHeaders';

describe('saveSessionHeaders', () => {
  beforeEach(() => {
    session.saveSession = jest.fn(() => Promise.resolve());
  });

  describe('with an ACCESS_TOKEN on the headers', () => {
    it('calls saveSession on sessionService', async () => {
      const headers = {
        get(key) {
          return this[key];
        },
        'access-token': 'test-token',
        uid: 'test-uid',
        client: 'test-client'
      };

      await saveSessionHeaders(headers);

      expect(session.saveSession).toHaveBeenCalledWith({
        token: 'test-token',
        uid: 'test-uid',
        client: 'test-client'
      });
    });
  });

  describe('with no ACCESS_TOKEN on the headers', () => {
    it("doesn't call saveSession on sessionService", async () => {
      const headers = {
        get(key) {
          return this[key];
        }
      };

      await saveSessionHeaders(headers);

      expect(session.saveSession).not.toHaveBeenCalled();
    });
  });
});
