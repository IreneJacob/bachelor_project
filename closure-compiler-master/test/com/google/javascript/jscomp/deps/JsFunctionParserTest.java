/*
 * Copyright 2008 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.javascript.jscomp.deps;

import static com.google.common.truth.Truth.assertThat;

import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.ErrorManager;
import com.google.javascript.jscomp.PrintStreamErrorManager;
import com.google.javascript.jscomp.deps.JsFunctionParser.SymbolInfo;
import java.util.Collection;
import java.util.Iterator;
import junit.framework.TestCase;

/**
 * Tests for {@link JsFunctionParser}
 *
 * @author agrieve@google.com (Andrew Grieve)
 */
public final class JsFunctionParserTest extends TestCase {
  private static final String SRC_PATH = "a";
  private JsFunctionParser parser;
  private ErrorManager errorManager;
  private final Collection<String> functions = ImmutableList.of("goog.require", "goog.provide");

  @Override
  public void setUp() {
    errorManager = new PrintStreamErrorManager(System.err);
    parser = new JsFunctionParser(functions, errorManager);
    parser.setShortcutMode(true);
  }

  /**
   * Tests:
   *  -Parsing of comments,
   *  -Parsing of different styles of quotes,
   *  -Correct recording of what was parsed.
   */
  public void testParseFile() {
    final String CONTENTS = "/*"
      + "goog.provide('no1');*//*\n"
      + "goog.provide('no2');\n"
      + "*/goog.provide('yes1');\n"
      + "/* blah */goog.provide(\"yes2\")/* blah*/\n"
      + "goog.require('yes3'); // goog.provide('no3');\n"
      + "// goog.provide('no4');\n"
      + "goog.require(\""
      + "bar.data.SuperstarAddStarThreadActionRequestDelegate\"); "
      + "//no new line at EOF";

    Collection<SymbolInfo> symbols = parser.parseFile(SRC_PATH, CONTENTS);

    Iterator<SymbolInfo> i = symbols.iterator();
    SymbolInfo symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes1");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes2");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes3");
    assertThat(symbolInfo.functionName).isEqualTo("goog.require");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("bar.data.SuperstarAddStarThreadActionRequestDelegate");
    assertThat(symbolInfo.functionName).isEqualTo("goog.require");

    assertThat(symbols).hasSize(4);
    assertThat(errorManager.getErrorCount()).isEqualTo(0);
    assertThat(errorManager.getWarningCount()).isEqualTo(0);
  }

  public void testMultiplePerLine() {
    final String CONTENTS = "goog.provide('yes1');goog.provide('yes2');/*"
        + "goog.provide('no1');*/goog.provide('yes3');//goog.provide('no2');";

    Collection<SymbolInfo> symbols = parser.parseFile(SRC_PATH, CONTENTS);

    Iterator<SymbolInfo> i = symbols.iterator();
    SymbolInfo symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes1");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes2");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes3");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    assertThat(symbols).hasSize(3);
    assertThat(errorManager.getErrorCount()).isEqualTo(0);
    assertThat(errorManager.getWarningCount()).isEqualTo(0);
  }

  public void testShortcutMode1() {
    // For efficiency reasons, we stop reading after the ctor.
    final String CONTENTS = " // hi ! \n /* this is a comment */ "
        + "goog.provide('yes1');\n /* and another comment */ \n"
        + "goog.provide('yes2'); // include this\n"
        + "foo = function() {};\n"
        + "goog.provide('no1');";

    Collection<SymbolInfo> symbols = parser.parseFile(SRC_PATH, CONTENTS);

    Iterator<SymbolInfo> i = symbols.iterator();
    SymbolInfo symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes1");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes2");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    assertThat(symbols).hasSize(2);
    assertThat(errorManager.getErrorCount()).isEqualTo(0);
    assertThat(errorManager.getWarningCount()).isEqualTo(0);
  }

  public void testShortcutMode2() {
    final String CONTENTS = "/** goog.provide('no1'); \n" +
        " * goog.provide('no2');\n */\n"
        + "goog.provide('yes1');\n";

    Collection<SymbolInfo> symbols = parser.parseFile(SRC_PATH, CONTENTS);

    Iterator<SymbolInfo> i = symbols.iterator();
    SymbolInfo symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes1");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");

    assertThat(symbols).hasSize(1);
    assertThat(errorManager.getErrorCount()).isEqualTo(0);
    assertThat(errorManager.getWarningCount()).isEqualTo(0);
  }

  public void testShortcutMode3() {
    final String CONTENTS = "/**\n" +
        " * goog.provide('no1');\n */\n"
        + "goog.provide('yes1');\n";

    Collection<SymbolInfo> symbols = parser.parseFile(SRC_PATH, CONTENTS);

    Iterator<SymbolInfo> i = symbols.iterator();
    SymbolInfo symbolInfo = i.next();
    assertThat(symbolInfo.symbol).isEqualTo("yes1");
    assertThat(symbolInfo.functionName).isEqualTo("goog.provide");
    assertThat(errorManager.getErrorCount()).isEqualTo(0);
    assertThat(errorManager.getWarningCount()).isEqualTo(0);
  }
}
