import {
	type ArrayTypeParser,
	type ConditionalTypeParser,
	type InferredTypeParser,
	type UnionTypeParser,
	type ReferenceTypeParser,
	TypeParser,
	type RestTypeParser,
	type UnknownTypeParser,
	type IntrinsicTypeParser,
	type LiteralTypeParser,
	type IndexedAccessTypeParser,
	type OptionalTypeParser,
	type TupleTypeParser,
	type IntersectionTypeParser,
	type NamedTupleMemberTypeParser,
	type PredicateTypeParser,
	type QueryTypeParser,
	type TemplateLiteralTypeParser,
	type MappedTypeParser,
	type TypeOperatorTypeParser,
	ReflectionTypeParser
} from "typedoc-json-parser";

interface GetTypeParameterResult {
	id: number | null;
	external: boolean;
	name: string;
	value: string;
}

function isSpecial(str: string): boolean {
	if (str.endsWith("[]")) return true;
	if (str.startsWith("(") && str.endsWith(")")) return true;
	if (str.endsWith(">")) return true;
	if (str.split(" ").length > 1) return true;

	return false;
}

export function getTypeParameter(anyType: TypeParser.Json | null | undefined): GetTypeParameterResult | null {
	if (!anyType) return null;

	switch (anyType.kind) {
		case TypeParser.Kind.Reference: {
			const type = anyType as ReferenceTypeParser.Json;
			const args = type.typeArguments.length
				? `<${type.typeArguments
						.map(getTypeParameter)
						.map((t) => t!.value)
						.join(", ")}>`
				: "";
			return {
				id: type.id,
				external: (type.id ?? 0) <= 0,
				name: type.name,
				value: `${type.name}${args}`
			};
		}
		case TypeParser.Kind.Array: {
			const type = anyType as ArrayTypeParser.Json;
			const value = getTypeParameter(type.type)!;

			return {
				...value,
				value: `Array<${value.value}>`
			};
		}
		case TypeParser.Kind.Conditional: {
			const type = anyType as ConditionalTypeParser.Json;
			const checkType = getTypeParameter(type.checkType)!;
			const extendsType = getTypeParameter(type.extendsType)!;
			const trueType = getTypeParameter(type.trueType)!;
			const falseType = getTypeParameter(type.falseType)!;

			return {
				id: null,
				external: true,
				name: "",
				value: `${checkType.value} extends ${extendsType.value} ? ${trueType.value} : ${falseType.value}`
			};
		}
		case TypeParser.Kind.Inferred: {
			const type = anyType as InferredTypeParser.Json;
			return {
				id: null,
				name: type.type,
				external: true,
				value: `infer ${type.type}`
			};
		}
		case TypeParser.Kind.Union: {
			const type = anyType as UnionTypeParser.Json;
			return {
				id: null,
				external: true,
				name: "",
				value: `${type.types
					.map(getTypeParameter)
					.map((v) => v!.value)
					.join(" | ")}`
			};
		}
		case TypeParser.Kind.Rest: {
			const type = anyType as RestTypeParser.Json;
			const restType = getTypeParameter(type.type)!;
			return {
				...restType,
				value: `${isSpecial(restType.value) ? `...(${restType.value})` : `...${restType.value}`}`
			};
		}
		case TypeParser.Kind.Unknown: {
			const type = anyType as UnknownTypeParser.Json;
			return {
				id: null,
				external: true,
				name: type.name,
				value: type.name
			};
		}
		case TypeParser.Kind.Intrinsic: {
			const type = anyType as IntrinsicTypeParser.Json;
			return {
				id: null,
				name: type.type,
				external: true,
				value: type.type
			};
		}
		case TypeParser.Kind.Literal: {
			const type = anyType as LiteralTypeParser.Json;
			return {
				id: null,
				name: type.value,
				external: true,
				value: type.value
			};
		}
		case TypeParser.Kind.IndexedAccess: {
			const type = anyType as IndexedAccessTypeParser.Json;
			const objectType = getTypeParameter(type.objectType)!;
			const indexType = getTypeParameter(type.indexType)!;

			return {
				...objectType,
				value: `${isSpecial(objectType.value) ? `(${objectType.value})[${indexType.value}]` : `${objectType.value}[${indexType.value}]`}`
			};
		}
		case TypeParser.Kind.Optional: {
			const type = anyType as OptionalTypeParser.Json;
			const optionalType = getTypeParameter(type.type)!;
			return {
				...optionalType,
				value: `${optionalType.value} | undefined`
			};
		}
		case TypeParser.Kind.Intersection: {
			const type = anyType as IntersectionTypeParser.Json;
			return {
				id: null,
				external: true,
				name: "",
				value: type.types
					.map(getTypeParameter)
					.map((v) => v!.value)
					.join(" & ")
			};
		}
		case TypeParser.Kind.NamedTupleMember: {
			const type = anyType as NamedTupleMemberTypeParser.Json;

			return {
				id: null,
				external: true,
				name: "",
				value: `${type.name}${type.optional ? "?" : ""}`
			};
		}
		case TypeParser.Kind.Tuple: {
			const type = anyType as TupleTypeParser.Json;
			return {
				id: null,
				external: true,
				name: "",
				value: `[${type.types
					.map(getTypeParameter)
					.map((v) => v!.value)
					.join(", ")}]`
			};
		}
		case TypeParser.Kind.Predicate: {
			const type = anyType as PredicateTypeParser.Json;
			if (!type.type)
				return {
					external: true,
					id: null,
					name: type.name,
					value: type.name
				};

			const predicateType = getTypeParameter(type.type)!;

			return {
				...predicateType,
				value: `${type.name} is ${predicateType.value}`
			};
		}
		case TypeParser.Kind.Query: {
			const type = anyType as QueryTypeParser.Json;
			const queryType = getTypeParameter(type.query)!;

			return queryType;
		}
		case TypeParser.Kind.TemplateLiteral: {
			const type = anyType as TemplateLiteralTypeParser.Json;
			return {
				id: null,
				external: true,
				name: "",
				value: `\`${type.tail.map((tail) => `${tail.text}\${${getTypeParameter(tail.type)!.value}}`).join("")}\``
			};
		}
		case TypeParser.Kind.Mapped: {
			const type = anyType as MappedTypeParser.Json;
			const parameterType = getTypeParameter(type.parameterType)!;
			const nameType = getTypeParameter(type.nameType)!;
			const templateType = getTypeParameter(type.templateType)!;
			const isReadonly = type.readonly === "+" ? true : false;
			const isOptional = type.optional === "+" ? true : false;

			return {
				id: null,
				external: true,
				name: "",
				value: `${isReadonly ? "readonly " : ""}[${type.parameter} ${nameType.value} ${parameterType.value}]${isOptional ? "?" : ""}: ${
					templateType.value
				}`
			};
		}
		case TypeParser.Kind.Reflection: {
			const type = anyType as ReflectionTypeParser.Json;
			console.log(type);
			return { id: null, external: true, name: "", value: "unknown" };
		}
		case TypeParser.Kind.TypeOperator: {
			const type = anyType as TypeOperatorTypeParser.Json;
			const parsedType = getTypeParameter(type.type)!;
			return {
				...parsedType,
				value: `${type.operator} ${parsedType.value}`
			};
		}
	}
}
