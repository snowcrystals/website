import Link from "next/link";
import type React from "react";
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

function isSpecial(str: string): boolean {
	if (str.endsWith("[]")) return true;
	if (str.startsWith("(") && str.endsWith(")")) return true;
	if (str.endsWith(">")) return true;
	if (str.split(" ").length > 1) return true;

	return false;
}

export function getTypeParametersString(anyType: TypeParser.Json): string {
	switch (anyType.kind) {
		case TypeParser.Kind.Reference: {
			const type = anyType as ReferenceTypeParser.Json;
			const args = type.typeArguments.length ? `<${type.typeArguments.map(getTypeParametersString).join(", ")}>` : "";
			return `${type.name}${args.length === 2 ? "" : args}`;
		}
		case TypeParser.Kind.Array: {
			const type = anyType as ArrayTypeParser.Json;
			const value = getTypeParametersString(type.type);

			return `Array<${value}>`;
		}
		case TypeParser.Kind.Conditional: {
			const type = anyType as ConditionalTypeParser.Json;
			const checkType = getTypeParametersString(type.checkType);
			const extendsType = getTypeParametersString(type.extendsType);
			const trueType = getTypeParametersString(type.trueType);
			const falseType = getTypeParametersString(type.falseType);

			return `${checkType} extends ${extendsType} ? ${trueType} : ${falseType}`;
		}
		case TypeParser.Kind.Inferred: {
			const type = anyType as InferredTypeParser.Json;
			return `infer ${type.type}`;
		}
		case TypeParser.Kind.Union: {
			const type = anyType as UnionTypeParser.Json;
			return `${type.types.map(getTypeParametersString).join(" | ")}`;
		}
		case TypeParser.Kind.Rest: {
			const type = anyType as RestTypeParser.Json;
			const restType = getTypeParametersString(type.type);

			return `${isSpecial(restType) ? `...(${restType})` : `...${restType}`}`;
		}
		case TypeParser.Kind.Unknown: {
			const type = anyType as UnknownTypeParser.Json;
			return type.name;
		}
		case TypeParser.Kind.Intrinsic: {
			const type = anyType as IntrinsicTypeParser.Json;
			return type.type;
		}
		case TypeParser.Kind.Literal: {
			const type = anyType as LiteralTypeParser.Json;
			return `"${type.value}"`;
		}
		case TypeParser.Kind.IndexedAccess: {
			const type = anyType as IndexedAccessTypeParser.Json;
			const objectType = getTypeParametersString(type.objectType);
			const indexType = getTypeParametersString(type.indexType);

			return `${isSpecial(objectType) ? `(${objectType})[${indexType}]` : `${objectType}[${indexType}]`}`;
		}
		case TypeParser.Kind.Optional: {
			const type = anyType as OptionalTypeParser.Json;
			const optionalType = getTypeParametersString(type.type);

			return `${optionalType} | undefined`;
		}
		case TypeParser.Kind.Intersection: {
			const type = anyType as IntersectionTypeParser.Json;
			return type.types.map(getTypeParametersString).join(" & ");
		}
		case TypeParser.Kind.NamedTupleMember: {
			const type = anyType as NamedTupleMemberTypeParser.Json;
			return `${type.name}${type.optional ? "?" : ""}`;
		}
		case TypeParser.Kind.Tuple: {
			const type = anyType as TupleTypeParser.Json;
			return `[${type.types.map(getTypeParametersString).join(", ")}]`;
		}
		case TypeParser.Kind.Predicate: {
			const type = anyType as PredicateTypeParser.Json;
			if (!type.type) return type.name;

			const predicateType = getTypeParametersString(type.type);
			return `${type.name} is ${predicateType}`;
		}
		case TypeParser.Kind.Query: {
			const type = anyType as QueryTypeParser.Json;
			const queryType = getTypeParametersString(type.query);

			return queryType;
		}
		case TypeParser.Kind.TemplateLiteral: {
			const type = anyType as TemplateLiteralTypeParser.Json;
			return `\`${type.tail.map((tail) => `${tail.text}\${${getTypeParametersString(tail.type)}}`).join("")}\``;
		}
		case TypeParser.Kind.Mapped: {
			const type = anyType as MappedTypeParser.Json;
			const parameterType = getTypeParametersString(type.parameterType);
			const nameType = type.nameType ? getTypeParametersString(type.nameType) : "";
			const templateType = getTypeParametersString(type.templateType);
			const isReadonly = type.readonly === "+" ? true : false;
			const isOptional = type.optional === "+" ? true : false;

			return `${isReadonly ? "readonly " : ""}[${type.parameter} ${nameType} ${parameterType}]${isOptional ? "?" : ""}: ${templateType}`;
		}
		case TypeParser.Kind.Reflection: {
			const { properties, signatures } = anyType as ReflectionTypeParser.Json;
			if (properties) {
				const mappedProperties = properties.map((property) => `${property.name}: ${getTypeParametersString(property.type)}`).join(", ");
				return `{ ${mappedProperties} }`;
			}

			if (signatures) {
				const mappedSignatures = signatures.map((signature) => {
					const name = signature.name === "__type" ? "" : signature.name;
					const params = signature.parameters
						.map((param) => `${param.rest ? "..." : ""}${param.name}${param.optional ? "?" : ""}: ${getTypeParametersString(param.type)}`)
						.join(", ");
					const typeParams = signature.typeParameters
						.map(
							(param) =>
								`${param.name}${param.constraint ? ` extends ${getTypeParametersString(param.constraint)}` : ""}${
									param.default ? `= ${getTypeParametersString(param.default)}` : ""
								}`
						)
						.join(", ");

					return `${name} ${typeParams.length ? `<${typeParams}>` : ""}(${params}) => ${getTypeParametersString(
						signature.returnType
					)}`.trim();
				});

				return mappedSignatures.join(" | ");
			}

			return "";
		}
		case TypeParser.Kind.TypeOperator: {
			const type = anyType as TypeOperatorTypeParser.Json;
			const parsedType = getTypeParametersString(type.type);
			return `${type.operator} ${parsedType}`;
		}
	}
}

// ==============================
// ==============================
// === REACT COMPONENT PARSER ===
// ==============================
// ==============================

function getTypeUrl(id: number | null, name: string, pkg: string, version: string): string | null {
	if (!id || id <= 0) return null;
	return `/docs/${pkg}/${version}/${name}:${id}`;
}

export function getTypeParametersReact(anyType: TypeParser.Json, pkg: string, version: string): React.ReactNode {
	switch (anyType.kind) {
		case TypeParser.Kind.Reference: {
			const type = anyType as ReferenceTypeParser.Json;
			const args = type.typeArguments.map((type) => getTypeParametersReact(type, pkg, version));

			const outerTypeUrl = getTypeUrl(type.id, type.name, pkg, version);
			const outerTypeComponent = outerTypeUrl ? (
				<Link className="text-primary" href={outerTypeUrl}>
					{type.name}
				</Link>
			) : (
				type.name
			);

			const stringArgs = type.typeArguments.length ? `<${type.typeArguments.map(getTypeParametersString).join(", ")}>` : "";
			const argsAreValid = stringArgs.length === 2 || args.length <= 0 ? false : true;

			const innerTypeComponent = argsAreValid && (
				<span>
					{"<"}
					{args.reduce((prev, curr) => [prev, ", ", curr])}
					{">"}
				</span>
			);

			return (
				<>
					<span>{outerTypeComponent}</span>
					{innerTypeComponent}
				</>
			);
		}
		case TypeParser.Kind.Array: {
			const type = anyType as ArrayTypeParser.Json;
			const value = getTypeParametersReact(type.type, pkg, version);

			return (
				<span>
					Array{"<"}
					{value}
					{">"}
				</span>
			);
		}
		case TypeParser.Kind.Conditional: {
			const type = anyType as ConditionalTypeParser.Json;
			const checkType = getTypeParametersReact(type.checkType, pkg, version);
			const extendsType = getTypeParametersReact(type.extendsType, pkg, version);
			const trueType = getTypeParametersReact(type.trueType, pkg, version);
			const falseType = getTypeParametersReact(type.falseType, pkg, version);

			return (
				<span>
					{checkType} <span>{" extends "}</span>
					{extendsType}
					<span>{" ? "}</span>
					{trueType}
					<span>{" : "}</span>
					{falseType}
				</span>
			);
		}
		case TypeParser.Kind.Inferred: {
			const type = anyType as InferredTypeParser.Json;
			return <span>infer {type.type}</span>;
		}
		case TypeParser.Kind.Union: {
			const type = anyType as UnionTypeParser.Json;
			return <span>{type.types.map((t) => getTypeParametersReact(t, pkg, version)).reduce((prev, curr) => [prev, " | ", curr])}</span>;
		}
		case TypeParser.Kind.Rest: {
			const type = anyType as RestTypeParser.Json;
			const restType = getTypeParametersReact(type.type, pkg, version);
			const restTypeStr = getTypeParametersString(type.type);

			return (
				<span>
					{isSpecial(restTypeStr) ? "...(" : "..."}
					{restType}
					{isSpecial(restTypeStr) ? ")" : ""}
				</span>
			);
		}
		case TypeParser.Kind.Unknown: {
			const type = anyType as UnknownTypeParser.Json;
			return <span>{type.name}</span>;
		}
		case TypeParser.Kind.Intrinsic: {
			const type = anyType as IntrinsicTypeParser.Json;
			return <span>{type.type}</span>;
		}
		case TypeParser.Kind.Literal: {
			const type = anyType as LiteralTypeParser.Json;
			return <span>{type.value}</span>;
		}
		case TypeParser.Kind.IndexedAccess: {
			const type = anyType as IndexedAccessTypeParser.Json;
			const objectType = getTypeParametersReact(type.objectType, pkg, version);
			const objectTypeStr = getTypeParametersString(type.objectType);
			const indexType = getTypeParametersReact(type.indexType, pkg, version);

			return (
				<span>
					{isSpecial(objectTypeStr) ? (
						<>
							{"("}
							{objectType}
							{")"}
							{"["}
							{indexType}
							{"]"}
						</>
					) : (
						<>
							{objectType}
							{"["}
							{indexType}
							{"]"}
						</>
					)}
				</span>
			);
		}
		case TypeParser.Kind.Optional: {
			const type = anyType as OptionalTypeParser.Json;
			const optionalType = getTypeParametersReact(type.type, pkg, version);

			return <span>{optionalType} | undefined</span>;
		}
		case TypeParser.Kind.Intersection: {
			const type = anyType as IntersectionTypeParser.Json;
			return <span>{type.types.map((type) => getTypeParametersReact(type, pkg, version)).reduce((prev, curr) => [prev, " & ", curr])}</span>;
		}
		case TypeParser.Kind.NamedTupleMember: {
			const type = anyType as NamedTupleMemberTypeParser.Json;
			return (
				<span>
					{type.name}${type.optional ? "?" : ""}
				</span>
			);
		}
		case TypeParser.Kind.Tuple: {
			const type = anyType as TupleTypeParser.Json;
			return <span>[{type.types.map((type) => getTypeParametersReact(type, pkg, version)).reduce((prev, curr) => [prev, ", ", curr])}]</span>;
		}
		case TypeParser.Kind.Predicate: {
			const type = anyType as PredicateTypeParser.Json;
			if (!type.type) return type.name;

			const predicateType = getTypeParametersReact(type.type, pkg, version);
			return (
				<span>
					{type.name} is {predicateType}
				</span>
			);
		}
		case TypeParser.Kind.Query: {
			const type = anyType as QueryTypeParser.Json;
			const queryType = getTypeParametersReact(type.query, pkg, version);

			return queryType;
		}
		case TypeParser.Kind.TemplateLiteral: {
			const type = anyType as TemplateLiteralTypeParser.Json;
			return (
				<span>
					`
					{type.tail.map((tail) => (
						<span>
							{tail.text}
							{"${"}
							{getTypeParametersReact(tail.type, pkg, version)}
							{"}"}
						</span>
					))}
					`
				</span>
			);
		}
		case TypeParser.Kind.Mapped: {
			const type = anyType as MappedTypeParser.Json;
			const parameterType = getTypeParametersReact(type.parameterType, pkg, version);
			const nameType = type.nameType ? getTypeParametersReact(type.nameType, pkg, version) : "";
			const templateType = getTypeParametersReact(type.templateType, pkg, version);
			const isReadonly = type.readonly === "+" ? true : false;
			const isOptional = type.optional === "+" ? true : false;

			return (
				<span>
					{isReadonly ? "readonly " : ""}[{type.parameter} {nameType} {parameterType}]{isOptional ? "?" : ""}: {templateType}
				</span>
			);
		}
		case TypeParser.Kind.Reflection: {
			const { properties, signatures } = anyType as ReflectionTypeParser.Json;
			if (properties) {
				const mappedProperties = properties
					.map((property) => (
						<span>
							{property.name}: {getTypeParametersReact(property.type, pkg, version)}
						</span>
					))
					.reduce((prev, curr) => [prev, ", ", curr] as any);
				return (
					<span>
						{"{ "}
						{mappedProperties}
						{" }"}
					</span>
				);
			}

			if (signatures) {
				const mappedSignatures = signatures.map((signature) => {
					const name = signature.name === "__type" ? "" : signature.name;
					const params = signature.parameters.map((param) => (
						<span>
							{param.rest ? "..." : ""}
							{param.name}
							{param.optional ? "?" : ""}: {getTypeParametersReact(param.type, pkg, version)}
						</span>
					));
					const typeParams = signature.typeParameters.map((param) => (
						<span>
							{param.name}
							{param.constraint ? <span>extends ${getTypeParametersReact(param.constraint, pkg, version)}</span> : ""}
							{param.default ? <span>= {getTypeParametersReact(param.default, pkg, version)}</span> : ""}
						</span>
					));
					return (
						<span>
							{name}{" "}
							{typeParams.length ? (
								<span>
									{"<"}
									{typeParams.reduce((prev, curr) => [prev, ", ", curr] as any)}
									{">"}
								</span>
							) : (
								""
							)}
							({params.length ? params.reduce((prev, curr) => [prev, ", ", curr] as any) : ""}){" => "}
							{getTypeParametersReact(signature.returnType, pkg, version)}
						</span>
					);
				});

				return mappedSignatures.reduce((prev, curr) => [prev, " | ", curr] as any);
			}

			return "";
		}
		case TypeParser.Kind.TypeOperator: {
			const type = anyType as TypeOperatorTypeParser.Json;
			const parsedType = getTypeParametersReact(type.type, pkg, version);

			return (
				<span>
					{type.operator} {parsedType}
				</span>
			);
		}
	}
}
