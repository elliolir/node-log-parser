abstract class BaseSerializer<T> {
  abstract serialize(data: string): T | null;
  abstract deserialize(data: T): string;
}

export default BaseSerializer;
