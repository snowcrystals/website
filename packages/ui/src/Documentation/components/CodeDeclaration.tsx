import type { JsonSearchResult } from "@website/doc-parser/src/Client";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import React from "react";
import {
	TypeParser,
	type TypeParameterParser,
	ReferenceTypeParser,
	SignatureParser,
	ArrayTypeParser,
	ConditionalTypeParser,
	InferredTypeParser,
	IndexedAccessTypeParser,
	UnionTypeParser,
	UnknownTypeParser,
	IntersectionTypeParser,
	IntrinsicTypeParser,
	LiteralTypeParser,
	TemplateLiteralTypeParser,
	OptionalTypeParser,
	RestTypeParser
} from "typedoc-json-parser";

interface Props {
	signature: SignatureParser.Json;
	type: JsonSearchResult["propertyType"];
}

function getJsFromType(type: JsonSearchResult["propertyType"]) {
	switch (type) {
		case "classes":
			return "class";
		case "enums":
			return "enum";
		case "functions":
			return "function";
		case "interfaces":
			return "interface";
		case "namespaces":
			return "namespace";
		case "variables":
			return "const";
		case "typeAliases":
			return "type";
	}
}

function getTypeParamaterValue(_type: TypeParser.Json): string {
	switch (_type.kind) {
		case TypeParser.Kind.Reference: {
			const type = _type as ReferenceTypeParser.Json;
			return type.name;
		}
		case TypeParser.Kind.Array: {
			const type = _type as ArrayTypeParser.Json;
			const nestedType = getTypeParamaterValue(type.type);
			return `${nestedType.split(" ").length > 1 ? `(${nestedType})` : nestedType}[]`;
		}
		case TypeParser.Kind.Conditional: {
			const type = _type as ConditionalTypeParser.Json;
			return `${getTypeParamaterValue(type.extendsType)} extends ${getTypeParamaterValue(type.checkType)} ? ${getTypeParamaterValue(
				type.trueType
			)} : ${getTypeParamaterValue(type.falseType)}`;
		}
		case TypeParser.Kind.Inferred: {
			const type = _type as InferredTypeParser.Json;
			return `infer ${type.type}`;
		}
		case TypeParser.Kind.IndexedAccess: {
			const type = _type as IndexedAccessTypeParser.Json;
			return `${getTypeParamaterValue(type.objectType)}[${getTypeParamaterValue(type.indexType)}]`;
		}
		case TypeParser.Kind.Union: {
			const type = _type as UnionTypeParser.Json;
			return type.types.map(getTypeParamaterValue).join(" | ");
		}
		case TypeParser.Kind.Unknown: {
			const type = _type as UnknownTypeParser.Json;
			return type.name;
		}
		case TypeParser.Kind.Intersection: {
			const type = _type as IntersectionTypeParser.Json;
			return type.types.map(getTypeParamaterValue).join(" & ");
		}
		case TypeParser.Kind.Intrinsic: {
			const type = _type as IntrinsicTypeParser.Json;
			return type.type;
		}
		case TypeParser.Kind.Literal: {
			const type = _type as LiteralTypeParser.Json;
			return type.value;
		}
		case TypeParser.Kind.TemplateLiteral: {
			const type = _type as TemplateLiteralTypeParser.Json;
			return `\`${type.head}\` ${type.tail
				.map((tail) => getTypeParamaterValue(tail.type))
				.map((t) => `\${${t}}`)
				.join(" ")}`;
		}
		case TypeParser.Kind.Optional: {
			const type = _type as OptionalTypeParser.Json;
			return `${getTypeParamaterValue(type.type)}?`;
		}
		case TypeParser.Kind.Rest: {
			const type = _type as RestTypeParser.Json;
			return getTypeParamaterValue(type.type);
		}
	}

	return "";
}

function getTypeConstraint(constraint: TypeParser.Json | null) {
	if (!constraint) return "";
	return ` extends ${getTypeParamaterValue(constraint)}`;

	// 	switch (_constraint.kind) {
	// 		case TypeParser.Kind.Reference: {
	// 			const constraint = _constraint as ReferenceTypeParser.Json;
	// 			return ` extends ${constraint.name}`;
	// 		}
	// 		case TypeParser.Kind.Array: {
	// 			const constraint = _constraint as ArrayTypeParser.Json;
	// 		}
	// 		default:
	// 			return "";
	// 	}
}

function getTypeDefault(typeDefault: TypeParser.Json | null) {
	if (!typeDefault) return "";
	return ` = ${getTypeParamaterValue(typeDefault)}`;

	// switch (_default.kind) {
	// 	case TypeParser.Kind.Reference: {
	// 		const defaultValue = _default as ReferenceTypeParser.Json;
	// 		return ` = ${defaultValue.name}`;
	// 	}
	// 	default:
	// 		return "";
	// }
}

function getTypeParamater(parameter: TypeParameterParser.Json) {
	const constraint = getTypeConstraint(parameter.constraint);
	const defaultValue = getTypeDefault(parameter.default);

	return `${parameter.name}${constraint}${defaultValue}`;
}

export const CodeDeclaration: React.FC<Props> = ({ signature, type }) => {
	const typeParameters = "typeParameters" in signature ? `<${signature.typeParameters.map(getTypeParamater).join(", ")}>` : "";
	return <SyntaxHighlighter code={`export declare ${getJsFromType(type)} ${signature.name}${typeParameters}`} />;
};
