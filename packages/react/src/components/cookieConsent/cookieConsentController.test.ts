/* eslint-disable jest/no-mocks-import */
import mockWindowLocation from './__mocks__/mockWindowLocation';
import createConsentController, {
  ConsentController,
  ConsentList,
  ConsentObject,
  createStorage,
  COOKIE_EXPIRATION_TIME,
  COOKIE_NAME,
} from './cookieConsentController';
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import extractSetCookieArguments from './test.util';

describe(`cookieConsentController.ts`, () => {
  let controller: ConsentController;
  const mockedWindowControls = mockWindowLocation();
  const mockedCookieControls = mockDocumentCookie();
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
    mockedWindowControls.restore();
  });

  const getSetCookieArguments = (index = -1) => extractSetCookieArguments(mockedCookieControls, index);

  const defaultControllerTestData = {
    requiredConsents: ['requiredConsent1', 'requiredConsent2'],
    optionalConsents: ['optionalConsent1', 'optionalConsent2'],
    cookie: {},
  };
  const createControllerAndInitCookie = ({
    requiredConsents,
    optionalConsents,
    cookieDomain,
    cookie = {},
  }: {
    requiredConsents?: ConsentList;
    optionalConsents?: ConsentList;
    cookie?: ConsentObject;
    cookieDomain?: string;
  }) => {
    mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookie) });
    controller = createConsentController({
      requiredConsents,
      optionalConsents,
      cookieDomain,
    });
  };
  describe('createConsentController', () => {
    describe('initialization', () => {
      it('parses requiredConsents and optionalConsents correctly', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        expect(controller.getRequired()).toEqual({
          requiredConsent1: false,
          requiredConsent2: false,
        });
        expect(controller.getOptional()).toEqual({
          optionalConsent1: false,
          optionalConsent2: false,
        });
      });

      it('parses and stores unknown consents', () => {
        const cookieDataWithUnknownConsents = {
          unknownConsent1: true,
          unknownConsent2: false,
          unknownConsent3: true,
        };
        const otherConsents = {
          requiredConsent1: false,
          requiredConsent2: false,
          optionalConsent1: false,
          optionalConsent2: false,
        };
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: cookieDataWithUnknownConsents,
        });
        expect(controller.save()).toEqual({
          ...cookieDataWithUnknownConsents,
          ...otherConsents,
        });
      });

      it('parses props correctly without consents', () => {
        createControllerAndInitCookie({});
        expect(controller.getRequired()).toEqual({});
        expect(controller.getOptional()).toEqual({});
      });

      it('throws when same consent is both optional and required', () => {
        expect(() =>
          createConsentController({
            requiredConsents: ['consent1', 'consent2'],
            optionalConsents: ['consent2', 'consent3'],
          }),
        ).toThrow();
      });

      it('restores saved consents correctly', () => {
        const storedCookieData = {
          requiredConsent1: true,
          optionalConsent2: true,
          unknownConsent1: true,
        };
        const allConsents = {
          ...storedCookieData,
          requiredConsent2: false,
          optionalConsent1: false,
        };
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: storedCookieData,
        });
        expect(controller.getRequired()).toEqual({
          requiredConsent1: allConsents.requiredConsent1,
          requiredConsent2: allConsents.requiredConsent2,
        });
        expect(controller.getOptional()).toEqual({
          optionalConsent1: allConsents.optionalConsent1,
          optionalConsent2: allConsents.optionalConsent2,
        });
        expect(controller.save()).toEqual(allConsents);
      });

      it('cookie is only read on init', () => {
        createControllerAndInitCookie({});
        expect(mockedCookieControls.mockGet).toHaveBeenCalledTimes(1);
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
      });
    });

    describe('unknown consents', () => {
      it('are parsed, stored and never changed', () => {
        const cookieDataWithUnknownConsents = {
          unknownConsent1: true,
          unknownConsent2: false,
          unknownConsent3: true,
        };
        const otherConsents = {
          requiredConsent1: false,
          requiredConsent2: false,
          optionalConsent1: false,
          optionalConsent2: false,
        };
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: cookieDataWithUnknownConsents,
        });
        controller.approveAll();
        controller.approveRequired();
        controller.rejectAll();
        expect(controller.save()).toEqual({
          ...cookieDataWithUnknownConsents,
          ...otherConsents,
        });
      });
    });

    describe('approveAll', () => {
      it('sets all consents to true. Setting consents does not store a new cookie', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        controller.approveAll();
        expect(controller.getRequired()).toEqual({
          requiredConsent1: true,
          requiredConsent2: true,
        });
        expect(controller.getOptional()).toEqual({
          optionalConsent1: true,
          optionalConsent2: true,
        });
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
      });
    });

    describe('approveRequired', () => {
      it(`approves all required consents. 
          Optional are not affected. 
          Setting consents does not store a new cookie`, () => {
        createControllerAndInitCookie(defaultControllerTestData);
        controller.approveRequired();
        expect(controller.getRequired()).toEqual({
          requiredConsent1: true,
          requiredConsent2: true,
        });
        expect(controller.getOptional()).toEqual({
          optionalConsent1: false,
          optionalConsent2: false,
        });
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
      });
    });

    describe('rejectAll', () => {
      it('rejects all consents. Setting consents does not store a new cookie', () => {
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: {
            requiredConsent1: true,
            requiredConsent2: true,
            optionalConsent1: true,
            optionalConsent2: true,
          },
        });

        expect({
          ...controller.getRequired(),
          ...controller.getOptional(),
        }).toEqual({
          requiredConsent1: true,
          requiredConsent2: true,
          optionalConsent1: true,
          optionalConsent2: true,
        });

        controller.rejectAll();

        expect({
          ...controller.getRequired(),
          ...controller.getOptional(),
        }).toEqual({
          requiredConsent1: false,
          requiredConsent2: false,
          optionalConsent1: false,
          optionalConsent2: false,
        });

        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
      });
    });

    describe('getUnhandledConsents', () => {
      it('returns consents that are not defined in previously saved cookie.', () => {
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: {
            requiredConsent1: true,
            optionalConsent2: true,
            unknownCookie1: false,
          },
        });
        const unhandled = controller.getUnhandledConsents();
        expect(unhandled.includes('requiredConsent2')).toBeTruthy();
        expect(unhandled.includes('optionalConsent1')).toBeTruthy();
        expect(unhandled.includes('unknownCookie1')).toBeFalsy();
      });
    });

    describe('getRequiredWithoutConsent', () => {
      it('returns required consents that are not currently approved', () => {
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookie: {
            requiredConsent1: true,
            optionalConsent2: true,
          },
        });
        const unhandled = controller.getUnhandledConsents();
        expect(unhandled.includes('requiredConsent2')).toBeTruthy();
        expect(unhandled.includes('optionalConsent1')).toBeTruthy();
      });
    });

    describe('update', () => {
      const allConsents = [
        ...defaultControllerTestData.requiredConsents,
        ...defaultControllerTestData.optionalConsents,
      ];
      it('sets a consent true/false', () => {
        createControllerAndInitCookie(defaultControllerTestData);

        const values = [true, false];

        values.forEach((value) => {
          allConsents.forEach((consent) => {
            controller.update(consent, value);
          });
          expect({
            ...controller.getRequired(),
            ...controller.getOptional(),
          }).toEqual({
            requiredConsent1: value,
            requiredConsent2: value,
            optionalConsent1: value,
            optionalConsent2: value,
          });
        });
      });

      it('Throws when setting an unknown consent', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        expect(() => controller.update('consentX', false)).toThrow();
      });

      it('Does not auto save the cookie', () => {
        allConsents.forEach((consent) => {
          controller.update(consent, true);
        });
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
      });
    });

    describe('save', () => {
      it('stores the data into a cookie', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(0);
        controller.approveRequired();
        controller.save();
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
        expect(JSON.parse(getSetCookieArguments().data)).toEqual({
          requiredConsent1: true,
          requiredConsent2: true,
          optionalConsent1: false,
          optionalConsent2: false,
        });
      });

      it('the domain of the cookie is set to <domain>.<suffix> so it is readable from *.hel.fi and *.hel.ninja', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        mockedWindowControls.setUrl('https://subdomain.hel.fi');
        controller.save();
        expect(getSetCookieArguments().options.domain).toEqual('hel.fi');
        mockedWindowControls.setUrl('http://profiili.hel.ninja:3000?foo=bar');
        controller.save();
        expect(getSetCookieArguments().options.domain).toEqual('hel.ninja');
      });

      it('if "cookieDomain" property is passed in the props, it is set as the domain of the cookie', () => {
        const cookieDomain = 'myhost.com';
        createControllerAndInitCookie({
          ...defaultControllerTestData,
          cookieDomain,
        });
        mockedWindowControls.setUrl('https://notmyhost.com');
        controller.save();
        expect(getSetCookieArguments().options.domain).toEqual(cookieDomain);
      });

      it('Cookie maxAge should match COOKIE_EXPIRATION_TIME', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        controller.save();
        expect(getSetCookieArguments().options.maxAge).toEqual(COOKIE_EXPIRATION_TIME);
      });

      it('Cookie name should match COOKIE_NAME', () => {
        createControllerAndInitCookie(defaultControllerTestData);
        controller.save();
        expect(getSetCookieArguments().cookieName).toEqual(COOKIE_NAME);
      });
    });
  });

  describe('createStorage', () => {
    const createTestStorage = () =>
      createStorage({
        required: {
          requiredConsent1: false,
          requiredConsent2: true,
        },
        optional: {
          optionalConsent1: false,
          optionalConsent2: true,
        },
        unknown: {
          unknownConsent1: false,
          unknownConsent2: true,
        },
      });

    it('Updates given consent and returns a new copy of data without mutating old data', () => {
      const storage = createTestStorage();
      const initialVersion = storage.getAll();
      let unknownConsents = initialVersion.unknown as ConsentObject;
      expect(initialVersion.required.requiredConsent1).toBeFalsy();
      expect(initialVersion.required.requiredConsent2).toBeTruthy();
      expect(initialVersion.optional.optionalConsent1).toBeFalsy();
      expect(initialVersion.optional.optionalConsent2).toBeTruthy();
      expect(unknownConsents.unknownConsent1).toBeFalsy();
      expect(unknownConsents.unknownConsent2).toBeTruthy();

      const approvedVersion = storage.approve(['requiredConsent1', 'optionalConsent1']);
      unknownConsents = approvedVersion.unknown as ConsentObject;
      expect(approvedVersion.required.requiredConsent1).toBeTruthy();
      expect(approvedVersion.required.requiredConsent2).toBeTruthy();
      expect(approvedVersion.optional.optionalConsent1).toBeTruthy();
      expect(approvedVersion.optional.optionalConsent2).toBeTruthy();
      // initial version is unchanged
      expect(initialVersion.required.requiredConsent1).toBeFalsy();
      expect(initialVersion.optional.optionalConsent1).toBeFalsy();
      // unknown consents are unchanged
      expect(unknownConsents.unknownConsent1).toBeFalsy();
      expect(unknownConsents.unknownConsent2).toBeTruthy();

      const rejectedVersion = storage.reject([
        'requiredConsent1',
        'requiredConsent2',
        'optionalConsent1',
        'optionalConsent2',
      ]);
      unknownConsents = rejectedVersion.unknown as ConsentObject;
      expect(rejectedVersion.required.requiredConsent1).toBeFalsy();
      expect(rejectedVersion.required.requiredConsent2).toBeFalsy();
      expect(rejectedVersion.optional.optionalConsent1).toBeFalsy();
      expect(rejectedVersion.optional.optionalConsent2).toBeFalsy();
      // previous version is unchanged
      expect(approvedVersion.required.requiredConsent1).toBeTruthy();
      expect(approvedVersion.required.requiredConsent2).toBeTruthy();
      expect(approvedVersion.optional.optionalConsent1).toBeTruthy();
      expect(approvedVersion.optional.optionalConsent2).toBeTruthy();
      // unknown consents are unchanged
      expect(unknownConsents.unknownConsent1).toBeFalsy();
      expect(unknownConsents.unknownConsent2).toBeTruthy();
    });

    it('Throws when setting an unknown consent', () => {
      const storage = createTestStorage();
      expect(() => storage.approve(['consentX'])).toThrow();
      expect(() => storage.reject(['consentX'])).toThrow();
      expect(() => storage.approve(['unknownConsent1'])).toThrow();
      expect(() => storage.reject(['unknownConsent2'])).toThrow();
    });

    it('getConsentByName returns true/false even for unknown consents. Unknown consents are false', () => {
      const storage = createTestStorage();
      expect(storage.getConsentByName('requiredConsent1')).toBeFalsy();
      expect(storage.getConsentByName('requiredConsent2')).toBeTruthy();
      expect(storage.getConsentByName('optionalConsent1')).toBeFalsy();
      expect(storage.getConsentByName('optionalConsent2')).toBeTruthy();
      expect(storage.getConsentByName('consentZ')).toBeFalsy();
      expect(storage.getConsentByName('unknownConsent1')).toBeFalsy();
      expect(storage.getConsentByName('unknownConsent2')).toBeFalsy();
    });
  });
});
