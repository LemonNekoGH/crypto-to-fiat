<template>
  <v-text-field
      :error="data.error"
      outlined
      :label="data.error ? data.errorLabel:data.defaultLabel" v-model="data.value" type="number">
    <template v-slot:prepend>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn color="primary" text outlined style="height: 56px;" v-on="on" v-bind="attrs">
            {{ $t(data.source) }}
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense>
          <v-list-item @click="data.source = currency" link
                       v-for="(currency, index) in $store.state.cryptoCurrency" :key="index">
            <v-list-item-title>{{ $t(currency) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:append-outer>
      <v-btn color="primary" text outlined style="height: 56px;" @click="$emit('convert')">
        <v-icon left>mdi-sync</v-icon>
        {{ $t("convert") }}
      </v-btn>
    </template>
  </v-text-field>
</template>
<script lang="ts">
import Vue from "vue"
import {SourceCurrencyData} from "@/types";

export default Vue.extend({
  name: "source-currency-field",
  props: {
    data: {
      type: SourceCurrencyData,
      required: true
    }
  }
})
</script>
