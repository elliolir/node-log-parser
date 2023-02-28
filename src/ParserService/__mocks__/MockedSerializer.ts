import BaseSerializer from '../../Serializers/BaseSerializer';

type mockedShape = Record<string, any>;

class MockedSerializer extends BaseSerializer<mockedShape> {
  serialize(data: string): mockedShape | null {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  deserialize(log: mockedShape): string {
    try {
      return JSON.stringify(log);
    } catch (e) {
      console.error(e);

      return '';
    }
  }
}

export default MockedSerializer;
